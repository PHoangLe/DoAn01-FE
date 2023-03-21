import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loggedIn:any;
  private accessToken = '';
  user: User;
  // constructor(private authService: SocialAuthService, private httpClient: HttpClient) { }
  constructor(private authService: SocialAuthService, private userService: UserService, private builder: FormBuilder, private router: Router) { }


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

  login(){
    console.log(this.loginForm.value);

    this.userService.logIn(this.loginForm.value).subscribe(req =>{
      console.log(this.loginForm.value);
      // this.router.navigate(['user'])
    })
  }
  // getUser(){
  //   this.userService.getUser().subscribe(data =>{
  //     this.user = data;
  //   })
  // }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  // }
  // signOut(): void {
  //   this.authService.signOut();
  // }
  // refreshToken(): void {
  //   this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }

  // async siginInBtnClick(): Promise<any>{

  // }
  // async login(): Promise<any>{
  //   const user:IUser = {};

  //   this.httpClient.get('https://doan01-be-production.up.railway.app/api/v1/auth/authenticate', {headers:{}, params:{

  //   }}).subscribe(response => {
  //     user = response
  //   })
  // }
}
