import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { FundManagementComponent } from './fund-management/fund-management.component';


const adminRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'adoption-request',
        component: AdoptionRequestComponent
      },
      {
        path: 'fund-management',
        component: FundManagementComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
