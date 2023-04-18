import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less']
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService,
    private builder: FormBuilder,
    private router: Router) { }

  isSubmitted = false
  isWrongOtp : boolean
  verifyForm = this.builder.group({
    otp: this.builder.control(''),
  })
  ngOnInit() {
  }
  async verifyEmail() {
    this.isSubmitted = true
    console.log("1")
    await this.otpCheck()
    console.log("4")
    if(this.isWrongOtp)
      console.log("ok")
  }

  async otpCheck() {
    this.authService.verifyEmail(this.verifyForm.value).subscribe(response => {
      this.isWrongOtp = false
      return
    }),
      err => {
        console.log("3")
        this.isWrongOtp = true
        return
      }
  }
}
