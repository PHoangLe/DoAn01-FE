import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticate/login/login.component';
import { LandingComponent } from './user/landing/landing.component';
import { RegisterComponent } from './authenticate/register/register.component';


const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
// const routes: Routes = [
//   // {
//   //   // path: '',
//   //   // // redirectTo: '/user/landing',
//   //   // pathMatch: 'full'
//   // },
//   {
//     path: 'user',
//     loadChildren: () => import('./user/user.module').then(m => m.UserModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)
//   }

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
