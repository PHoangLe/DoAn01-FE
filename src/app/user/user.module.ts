import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
