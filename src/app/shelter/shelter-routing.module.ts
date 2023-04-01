import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RequestAccountComponent } from './request-account/request-account.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'request-account',
    component: RequestAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule { }
