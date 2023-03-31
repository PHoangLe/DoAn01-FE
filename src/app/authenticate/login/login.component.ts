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
  user: User;
  userData: any;
  constructor(private socialLoginService: SocialAuthService, private authService: AuthService, private builder: FormBuilder, private router: Router) { }


  loginForm = this.builder.group({
    userEmail: this.builder.control(''),
    userPassword: this.builder.control('')
  })
  ngOnInit(): void {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);

    // this.authService.authState.subscribe((user) => {
    //   // this.user.email = user.email;
    //   // this.user.name = user.name;
    //   // this.user.photoURL = user.photoUrl;
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(this.user);
    //   this.getAccessToken();
    // });

  }

  login() {
    this.authService.logIn(this.loginForm.value).subscribe(
      (response) => {
        // console.log(response);
        this.userData = response
        this.router.navigate(['/user'])
        this.authService.setRoles(response.userRoles)
        this.authService.setToken(response.jwtToken)
        console.log(this.authService.getRoles())
        console.log(this.authService.getToken())

        const roles = response.userRoles[0]
        console.log("login response: " + response.userRoles)
        if(roles === "ROLE_ADMIN") {
          console.log("ADMIN")
          // this.router.navigate(['/admin'])
        }
        else{
          console.log("Not ADMIN")
          // this.router.navigate(['/user'])

        }

      }
      );
  }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }
  // signOut(): void {
  //   this.authService.signOut();
  // }
  refreshToken(): void {
    this.socialLoginService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
