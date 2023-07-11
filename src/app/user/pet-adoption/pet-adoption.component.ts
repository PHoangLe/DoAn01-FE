import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { Shelter } from 'src/app/model/Shelter';
import { PetService } from 'src/app/services/pet.service';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-pet-adoption',
  templateUrl: './pet-adoption.component.html',
  styleUrls: ['./pet-adoption.component.less']
})
export class PetAdoptionComponent implements OnInit {

  protected pets;
  protected isLoading = true;
  protected defaultPets;
  protected listShelter: Shelter[];
  protected selectedShelter;
  protected selectedSpecie = "All";
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
  constructor(private shelterService: ShelterService, private PetService: PetService) {
  }

  ngOnInit(): void {

    this.getAllPets();
    this.getAllShelter()
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ'
      },
      {
        label: 'Danh sách thú cưng',
      }
    ]
  }

  getAllShelter() {
    this.shelterService.getAllShelter().subscribe(response => {
      this.listShelter = this.shelterService.convertToShelter(response)

    }),
      err => {
        console.log(err.error.message)
      }
  }

  async getAllPets() {
    this.isLoading = true
    await this.PetService.getAllPets().then(response => {
      this.pets = this.PetService.convertToPets(response)
      this.defaultPets = [...this.pets]
    }).catch(err => {
      err => {
        console.log(err.error.message)
      }
    })
    this.isLoading = false

  }

  onCheckboxShelterChange(event) {
    this.pets = [...this.defaultPets]
    if (this.selectedSpecie === "All") {
      this.pets = this.pets.filter(pet => {
        return pet.shelterID === event.value.shelterID
      })
    }
    else {
      this.pets = this.pets.filter(pet => {
        return pet.shelterID === event.value.shelterID &&
          pet.animalSpecie === this.selectedSpecie
      })
    }
  }

  onCheckboxBreedChange(event) {
    this.pets = [...this.defaultPets]
    console.log(event)

    if (event.value === "All") {
      if (this.selectedShelter === "All")
        return
      else
        this.pets = this.pets.filter(pet => {
          return pet.shelterID === this.selectedShelter.shelterID
        })

    }
    else if (this.selectedShelter)
      this.pets = this.pets.filter(pet => {
        return pet.shelterID === this.selectedShelter.shelterID &&
          pet.animalSpecie === event.value
      })
    else
      this.pets = this.pets.filter(pet => pet.animalSpecie === event.value)

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
