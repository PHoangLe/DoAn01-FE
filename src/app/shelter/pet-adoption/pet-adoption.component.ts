import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { Shelter } from 'src/app/model/Shelter';
import { PetAdoptService } from 'src/app/services/pet-adopt.service';
import { ShelterService } from 'src/app/services/shelter.service';
import { AddPetComponent } from './add-pet/add-pet.component';

@Component({
  selector: 'app-pet-adoption',
  templateUrl: './pet-adoption.component.html',
  styleUrls: ['./pet-adoption.component.less'],
  providers: [DialogService, MessageService]
})
export class PetAdoptionComponent implements OnDestroy {

  // protected pets: Pet[] ;
  protected pets;
  protected defaultPets;
  protected listShelter: Shelter[];
  protected selectedSpecie: string;
  protected currentPage = 1;
  protected pageSize = 20;
  protected sortField = '';
  protected searchValue;
  protected sortOrder = 1; // thứ tự sắp xếp (1: tăng dần, -1: giảm dần)
  protected petSpecie = [
    { id: "All", value: "Tất cả" },
    { id: "Dog", value: "Chó" },
    { id: "Cat", value: "Mèo" }
  ]
  protected breadcrumbItimes: MenuItem[];

  ref: DynamicDialogRef;

  constructor(private shelterService: ShelterService, private petAdoptService: PetAdoptService, public dialogService: DialogService, public messageService: MessageService) {
  }


  ngOnInit(): void {

    this.getAllPets();
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ'
      },
      {
        label: 'Danh sách thú cưng',
      }
    ]
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  showDialog() {
    this.ref = this.dialogService.open(AddPetComponent, {
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })

    this.ref.onClose.subscribe((pet: Pet) => {
      if (pet) {
        this.messageService.add({ severity: 'info', summary: 'pet Selected', detail: pet.animalName });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })
  }

  async getAllPets() {
    await this.petAdoptService.getAllPetsByShelter().then(response => {
      this.pets = this.petAdoptService.convertToPets(response)
    }),
      err => {
        console.log(err.error.message)
      }
    this.defaultPets = [...this.pets]
  }

  onCheckboxBreedChange(event) {
    this.pets = [...this.defaultPets]
    if (event.value === "All") {
      return
    }
    this.pets = this.pets.filter(pet => pet.animalSpecie === this.selectedSpecie)
  }
}
