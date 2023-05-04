import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { UserRoutingModule } from './user-routing.module';
import { RequestAccountComponent } from './request-account/request-account.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PetCardComponent } from '../shared/components/pet-card/pet-card.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AvatarModule } from 'primeng/avatar';
import { GalleriaModule } from 'primeng/galleria';



@NgModule({
  declarations: [
    LandingComponent,
    RequestAccountComponent,
    PetAdoptionComponent,
    PetDetailComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    UserRoutingModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,
    DividerModule,
    PaginatorModule,
    DataViewModule,
    RadioButtonModule,
    BreadcrumbModule,
    AvatarModule,
    GalleriaModule
  ]
})
export class UserModule { }
