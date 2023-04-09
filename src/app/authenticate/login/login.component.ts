import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loggedIn: any;
  private accessToken = '';
  userData: any;
  isSubmitted = false;
  constructor(
    private socialLoginService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private fileUpload: UploadFileService,
    private router: Router,
  ) { }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    userPassword: this.builder.control('', [Validators.required, Validators.maxLength(20), Validators.minLength(6)])
  })
  ngOnInit(): void {
    this.loginWithGoogle()
  }

  loginWithGoogle() {
    this.socialLoginService.authState.subscribe(
      (user) => {
        console.log("email " + user.email)
        console.log("first name " + user.firstName)
        console.log("last name " + user.lastName)
        console.log("photo " + user.photoUrl)

        this.authService.loginGoogle(user).subscribe(
          response => {
            this.setLocalUser(response)
          }
        )
        this.router.navigate(['/user'])
      });
  }

  login() {
    this.isSubmitted = true;
    const isCorrectLogin = false
    var emailFBText = document.getElementById("validationEmailFeedback")
    var passwordFBText = document.getElementById("validationPasswordFeedback")

    // if (this.loginForm.controls.userEmail.errors['required']) {
    //   emailFBText.textContent = "Bạn chưa nhập email"
    //   return
    // }
    // if(this.loginForm.controls.userPassword.errors['required']){
    //   passwordFBText.textContent = "Bạn chưa nhập mật khẩu"
    //   return
    // }

    if(this.loginForm.controls.userPassword.errors){
      emailFBText.textContent = "Email chưa đúng"
      return
    }
    if(this.loginForm.controls.userPassword.errors){
      passwordFBText.textContent = "Mật khẩu chưa đúng"
      return
    }

    this.authService.logIn(this.loginForm.value).subscribe(
      (response) => {
        this.setLocalUser(response)
        this.authService.setToken(response.jwtToken)
        this.authService.setRoles(response.userRoles)
        const roles = response.userRoles
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin'])
        }
        else if (roles.includes('ROLE_SHELTER_MANAGER')) {
          this.router.navigate(['/shelter'])
        }
        else {
          this.router.navigate(['/user'])
        }
      },
      err => {
      }
    );
  }

  getAccessToken(): void {
    this.socialLoginService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(
      accessToken => this.accessToken = accessToken);
  }
  signOut(): void {
    this.socialLoginService.signOut();
  }
  refreshToken(): void {
    this.socialLoginService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  isEmptyEmail(): boolean {
    if (this.loginForm.controls['userEmail'].value === "")
      return true
    return false
  }

  setLocalUser(inputData: any) {
    console.log(inputData)
    localStorage.setItem("jwtToken", inputData.jwtToken);
    localStorage.setItem("userRoles", inputData.userRoles);
    localStorage.setItem("userID", inputData.userID);
    localStorage.setItem("userName", inputData.userFullName);
    localStorage.setItem("userEmail", inputData.userEmail);
    localStorage.setItem("userAvatar", inputData.userAvatar);

  }

}
