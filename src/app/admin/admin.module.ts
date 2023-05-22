import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AppSharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { FundManagementComponent } from './fund-management/fund-management.component';



@NgModule({
  declarations: [
    LandingComponent,
    AdoptionRequestComponent,
    FundManagementComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
