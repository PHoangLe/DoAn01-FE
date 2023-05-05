import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  isSubmitted = false
  isWrongOtp: boolean
  verifyForm = this.builder.group({
    otp: this.builder.control(''),
  })
  ngOnInit() {
  }
  async verifyEmail() {
    this.isSubmitted = true
    console.log('verifyEmail')
    await this.otpCheck();
    console.log('verified')
    console.log(!this.isWrongOtp);
    if (!this.isWrongOtp)
      this.messageService.add({ key: 'verifySuccess', severity: 'success', summary: 'Tạo tài khoản thành công' });
  }

  async otpCheck() {
    await this.authService.verifyEmail(this.verifyForm.value).then(response => {
      this.isWrongOtp = false
      console.log('verifying')
      return
    }).catch(error => {
      console.log(error);
    });
  }
}
