import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent {
  loginWithgg: any;
  private accessToken = '';
  userData: any;
  isSubmitted = false;
  isWrongLogin = false;
  isReset = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private builder: FormBuilder,
    private router: Router,
  ) { }

  changePassForm = this.builder.group({
    oldPassword: this.builder.control('', [Validators.required]),
    newPassword: this.builder.control('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
  })
  ngOnInit(): void {
  }

  async changePassword() {
    this.isSubmitted = true;
    this.isWrongLogin = false

    this.userService.changPassword(this.changePassForm.value).then(response => {
      this.isReset = true;
    })
      .catch(error => {
        this.isSubmitted = false;
        this.isWrongLogin = true;
      })
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const valid = pattern.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

}
