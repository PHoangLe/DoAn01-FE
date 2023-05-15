import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/services/pet.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.less']
})
export class BankingComponent implements OnInit {

  pet: Pet;
  ngOnInit(): void {

  }

  constructor(
    private petService: PetService,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService) {
    this.pet = this.config.data
    console.log(this.pet)
  }

  bindData() {

  }

}
