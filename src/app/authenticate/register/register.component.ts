import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { FormBuilder } from '@angular/forms';

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


  registerForm = this.builder.group({
    userEmail: this.builder.control(''),
    userPassword: this.builder.control(''),
    userName: this.builder.control('')
  })

  ngOnInit() {

  }

  registerNewUser() {
    this.authService.registerNewUser(this.registerForm.value).subscribe(response => {
      // console.log("register response: " + response)
    })

    this.authService.sendOTPVerifyEmail(this.registerForm.value.userEmail).subscribe(response => {
      // console.log("send otp response: " + response)
    })
    this.router.navigate(['verify'])
  }


}
