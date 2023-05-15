import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/services/pet.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.less']
})
export class EditPetComponent implements OnInit {
  pet: Pet;
  inputPet = new Pet();
  selectedSpecie: any;
  selectedGender: any;
  avatarFile: any;
  avatarUrl: any;
  othersImg: Array<File> = new Array
  listImages: string[];
  removedImgs: Array<string> = new Array
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
      id: 'Dog', value: 'Chó'
    },
    {
      id: 'Cat', value: 'Mèo'
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
      id: 'friendly', value: 'Thân thiện', checked: true
    }
  ]


  constructor(private petService: PetService,
    public ref: DynamicDialogRef,
    private builder: FormBuilder,
    private fileUpload: UploadFileService,
    private config: DynamicDialogConfig,
    private messageService: MessageService) {
    this.pet = this.config.data
  }

  async ngOnInit() {
    await this.bindData()
  }


  bindData() {
    this.inputPet = this.pet;
    this.selectedSpecie = this.specieOptions.find(option => option.id == this.pet.animalSpecie);
    this.selectedGender = this.genderOptions.find(option => option.id == (this.pet.animalGender ? '1' : '0'));
    this.listStatus[0].checked = this.pet.sterilized;
    this.listStatus[1].checked = this.pet.deWormed;
    this.listStatus[2].checked = this.pet.vaccinated;
    this.listStatus[3].checked = this.pet.friendly;
    this.listImages = [...this.inputPet.othersImg]
  }
  async updatePet() {
    this.inputPet.animalGender = this.selectedGender.id === '0' ? false : true;
    this.inputPet.animalSpecie = this.selectedSpecie.id
    this.pet.sterilized = this.listStatus[0].checked
    this.pet.deWormed = this.listStatus[1].checked;
    this.pet.vaccinated = this.listStatus[2].checked;
    this.pet.friendly = this.listStatus[3].checked;

    await this.pushFileToCloud();
    await this.removeImgFromStorage();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    console.log(this.inputPet)
    this.petService.updatePet(this.inputPet, this.avatarUrl, uploadedDocUrl).then(() => {
      this.messageService.add({ key: 'updatePet', severity: 'success', summary: 'Cập nhật thành công' });
      setTimeout(() => {
        this.ref.close()
      }, 1000);
    })
      .catch(error => {
        console.log(error.error.message);
        this.messageService.add({ key: 'updatePet', severity: 'error', summary: error.error.message });
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

  checkStatus(event) {
    console.log(this.listStatus)
  }

  deleteImg(imgLink) {
    this.removedImgs.push(imgLink);
    this.listImages = this.listImages.filter(e => e !== imgLink);
  }

  async removeImgFromStorage() {
    await this.removedImgs.forEach(img => {
      this.fileUpload.deleteFile(img);
    });
  }
}
