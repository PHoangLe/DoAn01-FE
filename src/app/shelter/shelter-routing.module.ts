import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';

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
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule { }
