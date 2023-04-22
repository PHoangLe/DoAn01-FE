import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { PetCardComponent } from './components/pet-card/pet-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    AvatarModule
  ],
  declarations: [
    HeaderComponent,
    PetCardComponent
  ],
  exports: [
    HeaderComponent,
    PetCardComponent

  ]
})
export class AppSharedModule { }
