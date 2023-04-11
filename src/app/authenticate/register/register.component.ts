import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(private socialService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router) { }

  isSubmitted = false;
  isWrongReg = false;

  namePattern = "[a-zA-Z][a-zA-Z ]+"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";

  registerForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required, Validators.email]),
    userPassword: this.builder.control('', [Validators.required,Validators.minLength(6) ,this.validatePassword]),
    userName: this.builder.control('', [Validators.required])
  })

  ngOnInit() {

  }

  registerNewUser() {
    this.isSubmitted = true;
    var emailFBText = document.getElementById("validationEmailFeedback")
    var passwordFBText = document.getElementById("validationPasswordFeedback")
    var nameFBText = document.getElementById("validationNameFeedback")
    let isWrongInput = false

    if (this.registerForm.controls.userEmail.errors?.['required']) {
      emailFBText.innerHTML = "Bạn chưa nhập email"
      isWrongInput = true
    }
    if(this.registerForm.controls.userPassword.errors?.['required']){
      passwordFBText.innerHTML = "Bạn chưa nhập mật khẩu"
      isWrongInput = true
    }

    if(this.registerForm.controls.userName.errors?.['required']){
      nameFBText.innerHTML = "Bạn chưa nhập họ và tên"
      isWrongInput = true
    }
    if (isWrongInput == true) {
      return
    }
    if (this.registerForm.controls.userEmail.errors) {
      emailFBText.innerHTML = "Email chưa hợp lệ"
      isWrongInput = true
    }
    if (this.registerForm.controls.userPassword.errors) {
      passwordFBText.innerHTML = "Mật khẩu chưa hợp lệ"
      isWrongInput = true

    }
    if (this.registerForm.controls.userName.errors) {
      nameFBText.innerHTML = "Họ tên chưa đúng"
      isWrongInput = true
    }
    if (isWrongInput == true) {
      return
    }

    this.authService.registerNewUser(this.registerForm.value).subscribe(response => {
    }),
      err => {
        emailFBText.innerHTML = err.error.message
        passwordFBText.innerHTML = ""
        nameFBText.innerHTML = ""
        isWrongInput = true
        return
      }
    this.authService.sendOTPVerifyEmail(this.registerForm.value.userEmail).subscribe(response => {
    })
    this.router.navigate(['verify'])
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    if (!hasLetter || !hasNumber) {
      return { 'password': { value: value } };
    }
    return null;
  }


}
