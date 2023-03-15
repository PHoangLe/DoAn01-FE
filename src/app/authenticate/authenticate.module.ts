import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateComponent } from './authenticate.component';
import {InputTextModule} from 'primeng/inputtext';
import { PasswordModule } from "primeng/password";
import { LoginComponent } from './login/login.component';
import {ButtonModule} from 'primeng/button';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';



@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SocialLoginModule
  ],

  declarations: [
    AuthenticateComponent,
    LoginComponent]
})
export class AuthenticateModule { }
