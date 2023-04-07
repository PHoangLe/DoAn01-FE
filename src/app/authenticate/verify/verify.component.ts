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

  constructor( private authService: AuthService,
    private builder: FormBuilder,
    private router: Router) { }

  verifyForm = this.builder.group({
    otp: this.builder.control(''),
  })
  ngOnInit() {
  }
  verifyEmail(){
    console.log(this.verifyForm.value)
    // console.log("email: " + this.authService.getUserEmail())
    this.authService.verifyEmail(this.verifyForm.value).subscribe(response => {

    })
  }

}
