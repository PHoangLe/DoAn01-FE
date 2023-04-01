import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { ShelterRoutingModule } from './shelter-routing.module';
import { RequestAccountComponent } from './request-account/request-account.component';



@NgModule({
  declarations: [
    LandingComponent,
    RequestAccountComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ShelterRoutingModule

  ]
})
export class ShelterModule { }
