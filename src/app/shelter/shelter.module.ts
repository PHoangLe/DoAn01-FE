import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { ShelterRoutingModule } from './shelter-routing.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { EditPetComponent } from './pet-detail/edit-pet/edit-pet.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { ShelterPageComponent } from './shelter-page/shelter-page.component';
import { AddPetComponent } from './pet-adoption/add-pet/add-pet.component';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { PetAdoptionComponent } from './pet-adoption/pet-adoption.component';
import { AdoptionRequestComponent } from './adoption-request/adoption-request.component';
import { AdoptionDetailComponent } from './adoption-detail/adoption-detail.component';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    LandingComponent,
    PetAdoptionComponent,
    AddPetComponent,
    PetDetailComponent,
    AdoptionRequestComponent,
    AdoptionDetailComponent,
    EditPetComponent,
    ProfileComponent,
    ChatComponent,
    ShelterPageComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ShelterRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FileUploadModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,
    DividerModule,
    PaginatorModule,
    DataViewModule,
    RadioButtonModule,
    BreadcrumbModule,
    DynamicDialogModule,
    TableModule,
    InputTextareaModule,
    GalleriaModule,
    AvatarModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    TagModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [MessageService, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShelterModule { }
