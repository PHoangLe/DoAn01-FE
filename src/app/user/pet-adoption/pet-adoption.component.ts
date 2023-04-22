import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-adoption',
  templateUrl: './pet-adoption.component.html',
  styleUrls: ['./pet-adoption.component.less']
})
export class PetAdoptionComponent implements OnInit {

  protected pets
  constructor() {
  }

  ngOnInit(): void {
    this.pets = [
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: 3,
        animalGender: "Male"
      },
      {
        animalName: "Amy",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-6405f112cd4f33356f99b784?alt=media&token=e8e9ccf2-ba8b-407a-88b1-4c66e8c2db16",
        animalBreed: "Cat",
        animalAge: 2,
        animalGender: "Female"
      },{
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: 3,
        animalGender: "Male"
      },
      {
        animalName: "Amy",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-6405f112cd4f33356f99b784?alt=media&token=e8e9ccf2-ba8b-407a-88b1-4c66e8c2db16",
        animalBreed: "Cat",
        animalAge: 2,
        animalGender: "Female"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: 3,
        animalGender: "Male"
      },
      {
        animalName: "Amy",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-6405f112cd4f33356f99b784?alt=media&token=e8e9ccf2-ba8b-407a-88b1-4c66e8c2db16",
        animalBreed: "Cat",
        animalAge: 2,
        animalGender: "Female"
      },
      {
        animalName: "John",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        animalBreed: "Dog",
        animalAge: 3,
        animalGender: "Male"
      },
      {
        animalName: "Amy",
        animalImg: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-6405f112cd4f33356f99b784?alt=media&token=e8e9ccf2-ba8b-407a-88b1-4c66e8c2db16",
        animalBreed: "Cat",
        animalAge: 2,
        animalGender: "Female"
      }
    ];


  }

}