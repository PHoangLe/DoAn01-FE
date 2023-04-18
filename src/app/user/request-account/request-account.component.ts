import { Component, OnInit } from '@angular/core';
import { percentage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { RequestShelterAccountService } from 'src/app/services/request-shelter-account.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.less']
})

export class RequestAccountComponent implements OnInit {
  avatarFile: FileList
  documentList: Array<File> = new Array
  relatedDoc: string[] = new Array
  listProvince = new Array
  listProvinceWithCode = new Array
  listDistrict = new Array
  listDistrictWithCode = new Array
  listWard = new Array

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private sendRequest: RequestShelterAccountService,
    private fileUpload: UploadFileService,
    private apiAddress: ApiAddressService) { }

  requestForm = this.builder.group({
    shelterName: this.builder.control('',Validators.required),
    shelterFacebookUrl: this.builder.control('', Validators.required),
    shelterNo: this.builder.control('', Validators.required),
    shelterProvince: this.builder.control('', Validators.required),
    shelterDistrict: this.builder.control('', Validators.required),
    shelterWard: this.builder.control('', Validators.required),
    shelterPhoneNum: this.builder.control('', [Validators.required]),
    shelterRelatedDoc: this.builder.control('')
  })

  ngOnInit() {
    this.bindProvinces()
  }

  upload(evnet: any) {
    this.pushFileToCloud();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.sendRequest.sendRequest(this.requestForm.value, this.relatedDoc).subscribe(
      response => {
        console.log(response)
      },
      err => {
        console.log(err.error.message)
      }
    )
  }

  pushFileToCloud() {
    for (let i = 0; i < this.documentList.length; i++) {
      this.fileUpload.pushFileToStorage(this.documentList[i], "document").subscribe(
        percentage => {

        },
        error => {
          console.log(error);
        }
      );
    }
  }

  selectedAvatar(event): void {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    this.fileUpload.pushFileToStorage(this.avatarFile[0], "logo").subscribe(
      percentage => {
      },
      error => {
        console.log(error);
      }
    );
    // this.fileUpload.getLogoImageUrl(localStorage.getItem("userID")).subscribe(
    //   url => {
    //     imgInput.src = url
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    imgInput.src = URL.createObjectURL(this.avatarFile[0])
  }

  setImgLogo() {
    const imgInput = <HTMLInputElement>document.querySelector("avatarInput")


  }

  selectFile(event: any): void {
    this.documentList = event.target.files;
  }
  public onSelectFiles(event) {

    for (let i = 0; i < (event.files as FileList).length; i++) {
      this.documentList.push((event.files as FileList).item(i));
    }
  }

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvinceWithCode = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name,
          provCode: rListProvince.code
        }
      })

      this.listProvince = rListProvince.map(rListProvince => rListProvince.name)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    let foundProvince = this.listProvinceWithCode.find(item => item.provName == selectedValue);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrictWithCode = rListDistrict.map(rListDistrict => {
        return {
          provName: rListDistrict.name,
          provCode: rListDistrict.code
        }
      }),
        err => {
          console.log(err.error.message)
        }

      this.listDistrict = rListDistrict.map(rListDistrict => rListDistrict.name)
    }),
      err => {
        console.log(err.error.message)
      }
  }

  districtSelectedChange(selectedValue){
    let foundWard = this.listDistrictWithCode.find(item => item.provName == selectedValue);
    this.apiAddress.getWardsByDistrict(foundWard.provCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => rListWard.name)
    }),
      err => {
        console.log(err.error.message)
      }
  }



}
