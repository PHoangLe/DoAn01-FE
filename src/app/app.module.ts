import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ShelterModule } from './shelter/shelter.module';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticateModule,
    UserModule,
    ShelterModule,
    HttpClientModule,
    ToastModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
