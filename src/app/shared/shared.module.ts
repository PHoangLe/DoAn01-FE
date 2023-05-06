import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { PetCardComponent } from './components/pet-card/pet-card.component';
import { FooterComponent } from './footer/footer.component';
import { WidgetComponent } from './widget/widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    AvatarModule,
    DividerModule,
    FontAwesomeModule,
    BreadcrumbModule
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
