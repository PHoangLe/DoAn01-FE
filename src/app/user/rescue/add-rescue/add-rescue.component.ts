import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { PetService } from 'src/app/services/pet.service';
import { RescueService } from 'src/app/services/rescue.service';
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
  avatarFile: any;
  avatarUrl: any;
  othersImg: Array<File> = new Array

  constructor(private rescueService: RescueService,
    public ref: DynamicDialogRef,
    private builder: FormBuilder,
    private apiAddress: ApiAddressService,
    private fileUpload: UploadFileService) { }

  addPostForm = this.builder.group({
    rescuePetProvince: this.builder.control('', Validators.required),
    rescuePetDistrict: this.builder.control('', Validators.required),
    rescuePetWard: this.builder.control('', Validators.required),
    rescuePetNo: this.builder.control('', Validators.required),
    rescuePetDetail: this.builder.control(''),
    rescuePetPosition: this.builder.control(''),
  })

  ngOnInit() {
    this.bindProvinces()
  }

  async addNewRescuePost() {
    await this.pushFileToCloud();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.rescueService.createNewPost(this.addPostForm.value, uploadedDocUrl).then(value => {
      console.log("add new post successfully")
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
      await this.fileUpload.pushFileToStorage(this.othersImg[i], "rescuePetImgs")
    }
  }

  public onSelectFiles(event) {
    for (let i = 0; i < (event.files as FileList).length; i++) {
      this.othersImg.push((event.files as FileList).item(i));
    }
  }

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvince = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    let foundProvince = this.listProvince.find(item => item.provName == selectedValue.provName);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrict = rListDistrict.map(rListDistrict => {
        return {
          distName: rListDistrict.name_with_type,
          distCode: rListDistrict.code
        }
      }),
        err => {
          console.log(err.error.message)
        }
    }),
      err => {
        console.log(err.error.message)
      }
  }

  districtSelectedChange(selectedValue) {
    this.apiAddress.getWardsByDistrict(selectedValue.distCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => {
        return {
          wardName: rListWard.name_with_type,
          wardCode: rListWard.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
  }

}
