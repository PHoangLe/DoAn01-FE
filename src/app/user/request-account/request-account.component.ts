import { Component, OnInit } from '@angular/core';
import { percentage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private sendRequest: RequestShelterAccountService,
    private fileUpload: UploadFileService) { }

  requestForm = this.builder.group({
    shelterName: this.builder.control(''),
    shelterFacebookUrl: this.builder.control(''),
    shelterNo: this.builder.control(''),
    shelterProvince: this.builder.control(''),
    shelterDistrict: this.builder.control(''),
    shelterWard: this.builder.control(''),
    shelterPhoneNum: this.builder.control(''),
    shelterRelatedDoc: this.builder.control('')
  })

  ngOnInit() {
  }

  upload(evnet: any) {
    this.pushFileToCloud();
    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.sendRequest.sendRequest(this.requestForm.value, this.relatedDoc).subscribe(
      response => {
        console.log(response)
      },
      err => {
        console.log(err.message)
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
    const imgInput   = <HTMLImageElement>document.getElementById("imgInput")
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

  setImgLogo(){
    const imgInput  = <HTMLInputElement>document.querySelector("avatarInput")


  }

  selectFile(event: any): void {
    this.documentList = event.target.files;
  }
  public onSelectFiles(event) {

    for (let i = 0; i < (event.files as FileList).length; i++) {
      this.documentList.push((event.files as FileList).item(i));
    }
  }



}
