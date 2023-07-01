import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

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
  constructor(
    private socialLoginService: SocialAuthService,
    private authService: AuthService,
    private builder: FormBuilder,
    private fileUpload: UploadFileService,
    private router: Router,
  ) { }

  loginForm = this.builder.group({
    oldPassword: this.builder.control('', [Validators.required]),
    newPassword: this.builder.control('', [Validators.required]),
    reEnterPasswod: this.builder.control('', [Validators.required]),

  })
  ngOnInit(): void {
  }

  async login() {
    this.isSubmitted = true;
    this.isWrongLogin = false

  }


}
