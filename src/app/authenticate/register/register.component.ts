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

  constructor(private authService: SocialAuthService, private userService: AuthService, private builder: FormBuilder, private router: Router) { }


  registerForm = this.builder.group({
    userEmail: this.builder.control(''),
    userPassword: this.builder.control(''),
    userName: this.builder.control('')
  })

  ngOnInit() {
  }

  registerNewUser() {
    this.userService.registerNewUser(this.registerForm.value).subscribe(response => {
      this.router.navigate(['verify'])
    })

  }
}
