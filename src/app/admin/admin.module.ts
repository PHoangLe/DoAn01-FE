import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AppSharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    AdminRoutingModule
  ],

})
export class AdminModule { }
