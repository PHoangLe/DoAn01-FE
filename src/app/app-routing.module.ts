import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authenticate/auth.guard';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard], data: {
      userRoles: ['ROLE_USER']
    }
  },
  {
    path: 'shelter',
    loadChildren: () => import('./shelter/shelter.module').then(m => m.ShelterModule),
    canActivate: [AuthGuard], data: {
      userRoles: ['ROLE_SHELTER_MANAGER']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
