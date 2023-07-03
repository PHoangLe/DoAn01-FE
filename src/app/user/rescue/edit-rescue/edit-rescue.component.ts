import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { RescueService } from 'src/app/services/rescue.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { RescueComponent } from '../rescue.component';

@Component({
  selector: 'app-edit-rescue',
  templateUrl: './edit-rescue.component.html',
  styleUrls: ['./edit-rescue.component.less'],
})
export class EditRescueComponent {
  rescuePost;
  listProvince = new Array
  listDistrict = new Array
  listWard = new Array
  selectedDistrict;
  selectedWard;
  selectedProvince;
  avatarFile: any;
  avatarUrl: any;
  othersImg: Array<File> = new Array
  removedImgs: Array<string> = new Array


  constructor(private rescueService: RescueService,
    public ref: DynamicDialogRef,
    private builder: FormBuilder,
    private rescue: RescueComponent,

    private apiAddress: ApiAddressService,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private fileUpload: UploadFileService) {
    this.rescuePost = this.config.data
    console.log(this.rescuePost)
  }

  ngOnInit() {
    this.bindProvinces()
  }

  async updateRescuePost() {
    await this.pushFileToCloud();
    await this.removeImgFromStorage();

    this.rescuePost.city = this.selectedProvince.provName;
    this.rescuePost.district = this.selectedDistrict.distName;
    this.rescuePost.ward = this.selectedWard.wardName;

    let uploadedDocUrl = this.fileUpload.getFileUrl()
    this.rescueService.updateRescuePost(this.rescuePost, uploadedDocUrl).then(value => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Cập nhật thành công' });
      this.rescue.reloadPage();

      setTimeout(() => {
        this.ref.close()
      }, 1500);
    })
      .catch(error => {
        console.log(error);
      });
  }

  async deleteRescuePost() {
    this.rescueService.deleteRescuePost(this.rescuePost.rescuePostID).then(value => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Xoá thành công' });
      this.rescue.reloadPage();
      setTimeout(() => {
        this.ref.close()
      }, 1000);
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
  deleteImg(imgLink) {
    this.removedImgs.push(imgLink);
    this.rescuePost.images = this.rescuePost.images.filter(e => e !== imgLink);
  }

  async removeImgFromStorage() {
    await this.removedImgs.forEach(img => {
      this.fileUpload.deleteFile(img);
    });
  }

  async bindProvinces() {
    await this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvince = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })
      this.selectedProvince = this.listProvince.find(r => r.provName === this.rescuePost.city)
      this.provinceSelectedChange(this.selectedProvince)
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
      })
      this.selectedDistrict = this.listDistrict.find(r => r.distName === this.rescuePost.district)
      this.districtSelectedChange(this.selectedDistrict)
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
      this.selectedWard = this.listWard.find(r => r.wardName === this.rescuePost.ward)
    }),
      err => {
        console.log(err.error.message)
      }
  }

}
