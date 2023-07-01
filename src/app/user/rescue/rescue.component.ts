import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Shelter } from 'src/app/model/Shelter';
import { ShelterService } from 'src/app/services/shelter.service';
import { PetService } from 'src/app/services/pet.service';
import { Router } from '@angular/router';
import { RescueService } from 'src/app/services/rescue.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRescueComponent } from './add-rescue/add-rescue.component';


@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.less'],
  providers: [DialogService, MessageService]
})
export class RescueComponent {
  protected pets;
  protected isLoading = true;
  protected defaultPets;
  protected listShelter: Shelter[];
  protected selectedShelter: string;
  protected selectedSpecie: string;
  protected currentPage = 1;
  protected pageSize = 20;
  protected sortField = '';
  protected searchValue;
  protected sortOrder = 1;
  protected petSpecie = [
    { id: "All", value: "Tất cả" },
    { id: "Dog", value: "Chó" },
    { id: "Cat", value: "Mèo" }
  ]
  protected breadcrumbItimes: MenuItem[];
  ref: DynamicDialogRef;
  constructor(
    private rescueService: RescueService,
    public dialogService: DialogService,
    public messageService: MessageService,

    private router: Router) {
  }

  ngOnInit(): void {

    this.getAllRescuePost();
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ',
        command: () => {
          this.router.navigate(['/user/landing'])
        }
      },
      {
        label: 'Danh sách cứu hộ',
      }
    ]
  }


  async getAllRescuePost() {
    this.isLoading = true
    await this.rescueService.getAllRescuePosts().then(response => {
      this.pets = response
      this.defaultPets = [...this.pets]
    }).catch(err => {
      err => {
        console.log(err.error.message)
      }
    })
    this.isLoading = false

  }

  addNewPost() {
    this.ref = this.dialogService.open(AddRescueComponent, {
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })
  }

  onCheckboxShelterChange(event) {
    if (event.checked.length > 0) {
      this.selectedShelter = event.checked[0].shelterID
      this.pets = this.pets.filter(pet => pet.shelterID == this.selectedShelter)
    }
    else {
      this.selectedShelter = null
      this.pets = [...this.defaultPets]
    }
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
}
