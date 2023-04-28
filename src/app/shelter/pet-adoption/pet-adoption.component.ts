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
  protected breadcrumbItimes: MenuItem[];

  ref: DynamicDialogRef;

  constructor(private shelterService: ShelterService, private petAdoptService: PetAdoptService, public dialogService: DialogService, public messageService: MessageService) {
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
    this.defaultPets = [...this.pets]
    // this.getAllPets();
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

  getAllPets() {
    this.petAdoptService.getAllPets().subscribe(response => {
      this.pets = this.petAdoptService.convertToPets(response)
    }),
      err => {
        console.log(err.error.message)
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
