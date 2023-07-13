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
  isWrongOtp = false
  verifyForm = this.builder.group({
    otp: this.builder.control(''),
  })
  ngOnInit() {
  }
  async verifyEmail() {
    this.isSubmitted = true
    await this.otpCheck();
    if (!this.isWrongOtp) {
      this.messageService.add({ key: 'verifySuccess', severity: 'success', summary: 'Tạo tài khoản thành công' });
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 2000);
    }
  }

  async otpCheck() {
    await this.authService.verifyEmail(this.verifyForm.value).then(response => {
      this.isWrongOtp = false
      return
    }).catch(error => {
      console.log(error);
    });
  }
}
