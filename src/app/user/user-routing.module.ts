import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RequestAccountComponent } from './request-account/request-account.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'request-account',
    component: RequestAccountComponent
  },
  {
    path: 'adopt',
    component: PetAdoptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
