import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
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
  isWrongLogin = false;
  constructor(
    private socialLoginService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private fileUpload: UploadFileService,
    private router: Router,
  ) { }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required, this.emailValidator('admin')]),
    userPassword: this.builder.control('', [Validators.required])
  })
  ngOnInit(): void {
    this.loginWithGoogle()
  }

  async loginWithGoogle() {
    await this.socialLoginService.authState.subscribe(
      (user) => {
        console.log("user ", user)
        this.authService.loginGoogle(user).subscribe(
          response => {
            this.setLocalUser(response)
            this.router.navigate(['/user'])
          }
        )
      });
  }

  async login() {
    this.isSubmitted = true;
    this.isWrongLogin = false
    console.log(this.loginForm.value)
    await this.authService.logIn(this.loginForm.value).then(
      (response) => {
        this.setLocalUser(response)
        const roles = response.userRoles
        if (roles.includes('ROLE_SHELTER_MANAGER')) {
          this.router.navigate(['/shelter'])
        }
        else {
          this.router.navigate(['/user'])
        }
      },

    ).catch(err => {
      this.isWrongLogin = true;
    });
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


  setLocalUser(inputData: any) {
    console.log(inputData)
    this.authService.setTimeResetToken("jwtToken", inputData.jwtToken)
    this.authService.setTimeResetToken("userRoles", inputData.userRoles);
    this.authService.setTimeResetToken("userID", inputData.userID);
    this.authService.setTimeResetToken("userName", inputData.userFullName);
    this.authService.setTimeResetToken("userEmail", inputData.userEmail);
    this.authService.setTimeResetToken("userAvatar", inputData.userAvatar);

  }

  emailValidator(exceptionEmail: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === exceptionEmail) {
        return null;
      } else if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      } else {
        return null;
      }
    };
  }

}
