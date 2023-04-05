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
  documentList: File[]

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private sendRequest: RequestShelterAccountService,
    private fileUpload: UploadFileService) { }

    requestForm = this.builder.group({
      shelterName: this.builder.control(''),
      shelterFacebookUrl: this.builder.control(''),
      shelterAddress: this.builder.control(''),
      shelterProvince: this.builder.control(''),
      shelterDistrict: this.builder.control(''),
      shelterWard: this.builder.control(''),
      shelterPhoneNum: this.builder.control(''),
      shelterRelatedDoc: this.builder.control(''),
    })

  ngOnInit() {
  }

  upload(evnet: any){
    console.log("document : " + this.documentList[0])

    this.fileUpload.pushFileToStorage(this.avatarFile[0], "avatar").subscribe(
      percentage =>{

      },
      error => {
        console.log(error);
      }
    );

    for(let i = 0; i < this.documentList.length; i++){
      this.fileUpload.pushFileToStorage(this.documentList[i], "document").subscribe(
        percentage => {

        },
        error => {
          console.log(error);
        }
      );
    }
    this.sendRequest.sendRequest(this.requestForm.value).subscribe(
      response => {

      },
      err => {
        console.log(err.error.message)
      }

    )
  }

  selectedAvatar(event): void{
    this.avatarFile = event.target.files;
  }

  selectFile(event: any): void {
    // console.log("file: " + event.target.files.name)
    this.documentList = event.target.files;
  }
  public onSelectFiles(event) {
    // console.log("file: " + event.files)
    this.documentList = event.files;
 }



}
