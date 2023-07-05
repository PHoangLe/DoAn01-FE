import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(private socialService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  isSubmitted = false;
  isWrongReg = false;
  isWrongEmail = false;
  isNotVerified = false;

  namePattern = "[a-zA-Z][a-zA-Z ]+"
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";

  registerForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required, Validators.email]),
    userPassword: this.builder.control('', [Validators.required, Validators.minLength(6), this.validatePassword]),
    userName: this.builder.control('', [Validators.required]),
    phoneNumber: this.builder.control('', [Validators.required, Validators.pattern(/^\d{9}$/)])
  })

  ngOnInit() {

  }

  async registerNewUser() {
    this.isSubmitted = true;
    this.isWrongReg = false;
    await this.authService.registerNewUser(this.registerForm.value).then(() => {
    }).catch(error => {
      console.log(error.error.message);
      if (error.error.message !== "Tài khoản đã tồn tại") {
        this.isNotVerified = true;
        this.messageService.add({ key: 'wrongEmail', severity: 'error', detail: error.error.message });
      }

      else {
        this.isWrongReg = true;
      }

    });
    if (!this.isWrongReg) {
      await this.authService.sendOTPVerifyEmail(this.registerForm.value.userEmail).then(() => {

      }).catch(error => {
        console.log(error.error.message);
      });
      this.router.navigate(['verify'])
    }
    else if (this.isNotVerified) {
      setTimeout(() => {
        this.router.navigate(['verify'])
      }, 2000);
    }

    else {
      this.messageService.add({ key: 'wrongEmail', severity: 'error', summary: 'Email đã tồn tại' });
    }
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const valid = pattern.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

}
