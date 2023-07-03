import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent {
  constructor(private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  isSubmitted = false
  isWrongOtp: boolean
  resetPassForm = this.builder.group({
    otp: this.builder.control('', Validators.required),
    newPassword: this.builder.control('', Validators.required),
  })
  ngOnInit() {
  }
  async changePassword() {
    this.isSubmitted = true;
    await this.authService.verifyNewPassword(this.resetPassForm.value).then(() => {
      this.messageService.add({ key: 'verifySuccess', severity: 'success', summary: 'Đổi mật khẩu thành công' });
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 500);
    })
      .catch(err => {
        console.log(err);
        this.isWrongOtp = true;
      })
  }
}
