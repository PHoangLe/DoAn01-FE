import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { PetCardComponent } from './components/pet-card/pet-card.component';
import { FooterComponent } from './footer/footer.component';
import { WidgetComponent } from './widget/widget.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    AvatarModule,
    DividerModule
  ],
  declarations: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent
  ],
  exports: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent

  ]
})
export class AppSharedModule { }
