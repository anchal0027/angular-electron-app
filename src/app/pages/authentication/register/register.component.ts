import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThemeService } from 'src/@fury/services/theme.service';
import { passwordMatchValidator } from 'src/app/validators/passwordValidator';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';
import { RegisterService } from './register.service';

@Component({
  selector: 'fury-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUpAnimation]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitted:boolean=false;
  inputType = 'password';
  visible = false;
  matcher:any;
  showTermsError:boolean=false;
  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar:MatSnackBar,
              private registerService:RegisterService
  ) { }

  ngOnInit() {
    const nameregex = /^[a-zA-Z ]*$/;
    const passRegex= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    this.registerForm = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(35)]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required,Validators.maxLength(35),Validators.pattern(passRegex)]],
      passwordConfirm: ['', [Validators.required,passwordMatchValidator,Validators.maxLength(35)]],
      accept: ['', Validators.required],
      // recaptcha: ['', Validators.required]
    });
  }
  submit() {
    this.isSubmitted=false;
    console.log(">> this.registerForm", this.registerForm.value)
    this.registerForm.markAllAsTouched();
    if(this.registerForm.value.password != this.registerForm.value.passwordConfirm){
      this.registerForm.controls.passwordConfirm.setErrors([{'passwordMismatch': true}]);
      return;
    }
    else{
      this.registerForm.controls.passwordConfirm.setErrors(null);
    }
   
    if(this.registerForm.valid){
      // 
      this.registerService.register({Name:this.registerForm.value.name,EmailId:this.registerForm.value.email,Password:this.registerForm.value.password}).subscribe((registerResult)=>{
        if(registerResult.isSuccess){
          this.registerService.login(this.registerForm.value.email,this.registerForm.value.password).subscribe((loginResult)=>{
            if(loginResult.isSuccess){
              localStorage.setItem("userDetails",loginResult.message);
              this.router.navigate(['/dashboard']);
            }
          })
        }
        else{
          this.snackbar.open(registerResult.message, 'Invalid credentials', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      })
    }
    else{
      this.isSubmitted=true;
      if(this.registerForm.value.accept==""){
        this.showTermsError=true;
      }
      // this.snackbar.open("Register was unsuccessful. Please correct the error and try again", 'Invalid cr edentials', {
      //   duration: 5000,
      //   horizontalPosition: 'right',
      //   verticalPosition: 'top',
      // });
    }
  }
  checkoxChange(){
    this.showTermsError=false;
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
  handleSuccess(e){

  }
  isValidName(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
  }

  if(evt.target.value.length>35){
    return false;
  }
  return true;

  }
}
