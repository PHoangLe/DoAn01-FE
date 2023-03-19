import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { IUser } from '../IUser';
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user:any;
  loggedIn:any;
  private accessToken = '';
  // constructor(private authService: SocialAuthService, private httpClient: HttpClient) { }
  constructor(private authService: SocialAuthService) { }


  ngOnInit() {
    // this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      // this.user.email = user.email;
      // this.user.name = user.name;
      // this.user.photoURL = user.photoUrl;
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
      this.getAccessToken();
    });
  }

  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }
  signOut(): void {
    this.authService.signOut();
  }
  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
