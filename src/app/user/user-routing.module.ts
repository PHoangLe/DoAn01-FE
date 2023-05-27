import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RequestAccountComponent } from './request-account/request-account.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { ProfileComponent } from './profile/profile.component';

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
  },
  {
    path: 'pet-detail/:id',
    component: PetDetailComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
