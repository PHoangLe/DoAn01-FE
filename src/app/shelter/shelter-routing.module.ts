import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
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
export class ShelterRoutingModule { }
