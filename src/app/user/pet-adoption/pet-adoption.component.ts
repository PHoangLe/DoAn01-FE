import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/Pet';
import { Shelter } from 'src/app/model/Shelter';
import { PetAdoptService } from 'src/app/services/pet-adopt.service';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-pet-adoption',
  templateUrl: './pet-adoption.component.html',
  styleUrls: ['./pet-adoption.component.less']
})
export class PetAdoptionComponent implements OnInit {

  // protected pets: Pet[] ;
  protected pets;
  protected defaultPets;
  protected listShelter: Shelter[];
  protected selectedShelter: string;
  protected selectedBreed: string;
  protected currentPage = 1;
  protected pageSize = 20;
  protected sortField = '';
  protected searchValue;
  protected sortOrder = 1; // thứ tự sắp xếp (1: tăng dần, -1: giảm dần)
  protected petBreed = [
    { id: "All", value: "Tất cả" },
    { id: "Dog", value: "Chó" },
    { id: "Cat", value: "Mèo" }
  ]


  constructor(private shelterService: ShelterService, private petAdoptService: PetAdoptService) {
  }

  ngOnInit(): void {
    this.pets = [
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642aasdasdsadc8231f4546f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true,
        shelterID: "642ae9ac8231f454f138b86f"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: "3",
        animalGender: true
      },
    ];
    // this.getAllPets();
    this.getAllShelter()

  }

  getAllShelter() {
    this.shelterService.getAllShelter().subscribe(response => {
      this.listShelter = this.shelterService.convertToShelter(response)
      this.defaultPets = [...this.pets]

    }),
      err => {
        console.log(err.error.message)
      }
  }

  getAllPets() {
    this.petAdoptService.getAllPets().subscribe(response => {
      this.pets = this.petAdoptService.convertToPets(response)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  onCheckboxShelterChange(event) {
    if (event.checked.length > 0) {
      console.log("is checked")
      this.selectedShelter = event.checked[0].shelterID
      this.pets = this.pets.filter(pet => pet.shelterID == this.selectedShelter)
    }
    else {
      console.log("false")
      this.selectedShelter = null
      this.pets = [...this.defaultPets]
    }
  }

  onCheckboxBreedChange(event) {
    this.pets = [...this.defaultPets]
    if (event.value == "All") {
      return
    }
    console.log(0)
    this.pets = this.pets.filter(pet => pet.animalBreed == this.selectedBreed)
  }

}
