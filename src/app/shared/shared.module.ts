import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BadgeModule } from 'primeng/badge';
import { RescueCardComponent } from './components/rescue-card/rescue-card.component';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { RescueCardShelterComponent } from './components/rescue-card-shelter/rescue-card-shelter.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    AvatarModule,
    DividerModule,
    FontAwesomeModule,
    BreadcrumbModule,
    BadgeModule,
    TagModule,
    GalleriaModule,
    ToastModule
  ],
  declarations: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent,
    SidebarComponent,
    RescueCardComponent,
    RescueCardShelterComponent
  ],
  exports: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent,
    SidebarComponent,
    RescueCardComponent,
    RescueCardShelterComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppSharedModule { }
