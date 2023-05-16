import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { Shelter } from 'src/app/model/Shelter';
import { PetService } from 'src/app/services/pet.service';
import { ShelterService } from 'src/app/services/shelter.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.less']
})
export class BankingComponent implements OnInit {

  pet: Pet;
  userEmail: string;
  shelterName: any;
  async ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem("userEmail")).value;
    this.shelterName = await this.shelterService.getShelterByShelterID(this.pet.shelterID);
  }

  constructor(
    private petService: PetService,
    private shelterService: ShelterService,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService) {
    this.pet = this.config.data
    console.log(this.pet)
  }


  completeTransaction() {
    this.messageService.add({ key: 'completeTransaction', severity: 'success', detail: 'Cảm ơn bạn! Chúng tôi sẽ xử lý sớm nhất' })
    setTimeout(() => {
      this.ref.close();
    }, 1500);
  }

}
