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
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    AvatarModule,
    DividerModule,
    FontAwesomeModule,
    BreadcrumbModule,
    NgxSpinnerModule,
  ],
  declarations: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent,
    LoadingAnimationComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    PetCardComponent,
    FooterComponent,
    WidgetComponent,
    LoadingAnimationComponent,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppSharedModule { }
