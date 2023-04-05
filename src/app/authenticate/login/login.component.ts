import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loggedIn: any;
  private accessToken = '';
  userData: any;
  constructor(
    private socialLoginService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router) { }

  loginForm = this.builder.group({
    userEmail: this.builder.control(''),
    userPassword: this.builder.control('')
  })
  ngOnInit(): void {
    // this.loginWithGoogle()
  }

  loginWithGoogle() {
    this.signOut()
    this.socialLoginService.authState.subscribe(
      (user) => {
      this.authService.loginGoogle(user).subscribe(
        response => {
          console.log("response " + response)
          // localStorage.setItem("userInfor.userID", response.userID)
        }
      )
          // console.log("user id: " + localStorage.getItem("userInfor.userID"))
          // this.router.navigate(['/user'])
    });
  }

  login() {
    this.authService.logIn(this.loginForm.value).subscribe(
      (response) => {
        localStorage.setItem("userInfor.userID", response.userID)
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
        console.log(err.error.message)
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

}
