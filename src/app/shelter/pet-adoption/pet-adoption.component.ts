import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { Shelter } from 'src/app/model/Shelter';
import { PetService } from 'src/app/services/pet.service';
import { ShelterService } from 'src/app/services/shelter.service';
import { AddPetComponent } from './add-pet/add-pet.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
  protected isLoading = true;
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

  constructor(
    private shelterService: ShelterService,
    private PetService: PetService,
    private AuthService: AuthService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router,
  ) {
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
    this.isLoading = true;
    await this.PetService.getAllPetsByShelter().then(response => {
      this.pets = this.PetService.convertToPets(response)
    }),
      err => {
        console.log(err.error.message)
      }
    this.defaultPets = [...this.pets]
    this.isLoading = false;
  }

  onCheckboxBreedChange(event) {
    this.pets = [...this.defaultPets]
    if (event.value === "All") {
      return
    }
    this.pets = this.pets.filter(pet => pet.animalSpecie === this.selectedSpecie)
  }

  onUserSearched() {
    if (this.searchValue === "")
      this.pets = [...this.defaultPets]
    this.pets = this.pets.filter((pet) => {
      return Object.values(pet).some((value) => String(value).includes(this.searchValue))
    })
    console.log(this.pets)
  }
  routeToPetDetail(pet: Pet) {
    this.PetService.setStoragePet(pet);
    if (this.AuthService.getDataFromCookie("userRoles").includes("ROLE_SHELTER_MANAGER"))
      this.router.navigate([`/shelter/pet-detail/${pet.animalID}`])
    else {
      this.router.navigate([`/user/pet-detail/${pet.animalID}`])
    }
  }
}
