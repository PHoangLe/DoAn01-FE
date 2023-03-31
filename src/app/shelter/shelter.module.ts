import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule
  ]
})
export class ShelterModule { }
