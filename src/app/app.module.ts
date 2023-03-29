import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticateModule,
    UserModule,
    HttpClientModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
