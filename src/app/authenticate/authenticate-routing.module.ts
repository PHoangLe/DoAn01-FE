import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticateRoutingModule { }
