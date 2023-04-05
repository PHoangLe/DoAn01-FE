import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { UserRoutingModule } from './user-routing.module';
import { RequestAccountComponent } from './request-account/request-account.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LandingComponent,
    RequestAccountComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
