import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent {
  constructor(private authService: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private messageService: MessageService) { }

  isSubmitted = false
  isWrongEmail: boolean
  forgorPassForm = this.builder.group({
    email: this.builder.control('', Validators.required),
  })
  ngOnInit() {
  }
  async sendOTPToEmail() {
    this.isSubmitted = true;
    this.authService.sendOTPForgotPassword(this.forgorPassForm.value).then(respose => {
      localStorage.setItem("validatedEmail", this.forgorPassForm.value.email)
      this.router.navigate(['/reset-password']);
    })
      .catch(err => {
        this.isWrongEmail = true;
      })
  }


}
