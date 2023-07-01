import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { PetService } from 'src/app/services/pet.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-rescue',
  templateUrl: './add-rescue.component.html',
  styleUrls: ['./add-rescue.component.less']
})
export class AddRescueComponent {
  pet: Pet;
  listProvince = new Array
  listProvinceWithCode = new Array
  listDistrict = new Array
  listDistrictWithCode = new Array
  listWard = new Array
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
      id: 'friendly', value: 'Thân thiện', checked: false
    }
  ]
  avatarFile: any;
  avatarUrl: any;
  othersImg: Array<File> = new Array

  constructor(private petService: PetService,
    public ref: DynamicDialogRef,
    private builder: FormBuilder,
    private apiAddress: ApiAddressService,
    private fileUpload: UploadFileService) { }

  addPostForm = this.builder.group({
    shelterProvince: this.builder.control('', Validators.required),
    shelterDistrict: this.builder.control('', Validators.required),
    shelterWard: this.builder.control('', Validators.required),
  })

  ngOnInit() {
    this.bindProvinces()

  }

  async addNewPet() {
    await this.pushFileToCloud();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.petService.addPet(this.addPostForm.value, this.avatarUrl, uploadedDocUrl).then(value => {
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

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvinceWithCode = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })

      this.listProvince = rListProvince.map(rListProvince => rListProvince.name_with_type)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    console.log(this.addPostForm.controls.shelterProvince.value)
    let foundProvince = this.listProvinceWithCode.find(item => item.provName == selectedValue);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrictWithCode = rListDistrict.map(rListDistrict => {
        return {
          provName: rListDistrict.name_with_type,
          provCode: rListDistrict.code
        }
      }),
        err => {
          console.log(err.error.message)
        }

      this.listDistrict = rListDistrict.map(rListDistrict => rListDistrict.name_with_type)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  districtSelectedChange(selectedValue) {
    let foundWard = this.listDistrictWithCode.find(item => item.provName == selectedValue);
    this.apiAddress.getWardsByDistrict(foundWard.provCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => rListWard.name_with_type)
    }),
      err => {
        console.log(err.error.message)
      }
  }

}
