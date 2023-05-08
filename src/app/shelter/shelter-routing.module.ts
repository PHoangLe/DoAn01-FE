import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { AdoptionDetailComponent } from './adoption-detail/adoption-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'adopt',
    component: PetAdoptionComponent,
  },
  {
    path: 'pet-detail/:id',
    component: PetDetailComponent
  },
  {
    path: 'adopt/adoption-request',
    component: AdoptionRequestComponent,
  },
  {
    path: 'adopt/adoption-detail/:id',
    component: AdoptionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule { }
