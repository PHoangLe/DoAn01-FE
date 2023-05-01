import { Component } from '@angular/core';
import { percentage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError } from 'rxjs';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptService } from 'src/app/services/pet-adopt.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.less']
})
export class AddPetComponent {
  pet: Pet;
  genderOptions = [
    {
      id: '0', value: 'Cái'
    },
    {
      id: '1', value: 'Đực'
    }
  ]

  specieOptions = [
    {
      id: '0', value: 'Chó'
    },
    {
      id: '1', value: 'Mèo'
    }
  ]
  listStatus = [
    {
      id: 'sterilized', value: 'Xổ giun', checked: false
    },
    {
      id: 'deWormed', value: 'Triệt sản', checked: false
    },
    {
      id: 'vaccinated', value: 'Tiêm phòng', checked: false
    },
    {
      id: 'friendly', value: 'Thân thiện', checked: false
    }
  ]
  avatarFile: any;
  avatarUrl: any;
  othersImg: Array<File> = new Array

  constructor(private petService: PetAdoptService, public ref: DynamicDialogRef, private builder: FormBuilder, private fileUpload: UploadFileService) { }

  addPetForm = this.builder.group({
    petName: this.builder.control('', Validators.required),
    petSpecie: this.builder.control('', Validators.required),
    petWeight: this.builder.control('', Validators.required),
    petBreed: this.builder.control('', Validators.required),
    petGender: this.builder.control('', Validators.required),
    petColor: this.builder.control('', Validators.required),
    petAge: this.builder.control('', Validators.required),
    petDetails: this.builder.control(''),
    friendly: this.builder.control(''),
    vaccinated: this.builder.control(''),
    deWormed: this.builder.control(''),
    sterilized: this.builder.control(''),

  })

  ngOnInit() {
  }

  async addNewPet() {
    await this.pushFileToCloud();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.petService.addPet(this.addPetForm.value, this.avatarUrl, uploadedDocUrl).then(value => {
      console.log("add new pet successfully")
      setTimeout(() => {
        this.ref.close()
      }, 1500);
    })
      .catch(error => {
        console.log(error);
      });
  }

  async pushFileToCloud() {
    for (let i = 0; i < this.othersImg.length; i++) {
      await this.fileUpload.pushFileToStorage(this.othersImg[i], "petImgs")
    }
  }

  async selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    await this.fileUpload.pushFileToStorage(this.avatarFile[0], "pet")
    this.avatarUrl = this.fileUpload.getAvatarUrl()
    imgInput.src = this.avatarUrl
  }

  public onSelectFiles(event) {
    for (let i = 0; i < (event.files as FileList).length; i++) {
      this.othersImg.push((event.files as FileList).item(i));
    }
  }


}
