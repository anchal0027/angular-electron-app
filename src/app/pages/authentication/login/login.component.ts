import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThemeService } from 'src/@fury/services/theme.service';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { AuthenticateService } from '../authenticate.service';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'fury-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInUpAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  remember:any=false
  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private registerService:RegisterService,
              private authenticateService:AuthenticateService
  ) {
  }

  ngOnInit() {
    let userDetails = this.authenticateService.getDecryptedData();
    this.remember = localStorage.getItem("isRemember")
    console.log(">>this.remember",this.remember)
    if(this.remember!=null){
      this.remember=true;
    }
    // if(this.remember=="true"){
    //   this.remember=true;
    // }
    // else{
    //   this.remember=false;
    // }
    if(userDetails!=null){
      this.form = this.fb.group({
        email: [userDetails.EmailId, Validators.required],
        password: [userDetails.Password, Validators.required]
      });
    }
    else{
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
    
  }
  onEnter(e)
  {
    this.send()
    // console.log(e)
    // alert("a")
  }

  
  send() {
    this.registerService.login(this.form.value.email,this.form.value.password).subscribe((loginResult)=>{
      if(loginResult.isSuccess){
        localStorage.setItem("userDetails",JSON.stringify(loginResult));
        localStorage.setItem("isRemember",this.remember);
        loginResult.message=JSON.parse(loginResult.message)
        loginResult.message.Password=this.form.value.password;
        this.authenticateService.encryptAndSave(JSON.stringify(loginResult.message));
        this.router.navigate(['/dashboard']);
      }
      else{
      
        this.snackbar.open(loginResult.message, 'Invalid credentials', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
      
    })
    // if(this.form.controls['email'].value == "admin@consillion.com" && this.form.controls['password'].value == "ClavDevAdmin@1234"){
      
    //   this.router.navigate(['/dashboard']);
    // }
   
  }
  valueChange(e){
    console.log(">>>>E",e)
    this.remember=e.checked;
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
