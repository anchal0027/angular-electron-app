import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }
  encryptAndSave(loginData){
    //login data shold be stringify
      localStorage.setItem("userDetails",loginData);
  }
  getDecryptedData(){
    let userData= localStorage.getItem("userDetails");
    return JSON.parse(userData);
  }
}
