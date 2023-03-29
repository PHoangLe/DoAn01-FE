import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import { PasswordModule } from "primeng/password";
import { LoginComponent } from './login/login.component';
import {ButtonModule} from 'primeng/button';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { RegisterComponent } from './register/register.component';
import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyComponent } from './verify/verify.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';


@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    SocialLoginModule,
    AuthenticateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '42306392438-925606n5t18allu2niibn0099ara176i.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    // AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // AuthService
  ],

  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ]
})
export class AuthenticateModule { }
