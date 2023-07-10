import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Shelter } from 'src/app/model/Shelter';
import { User } from 'src/app/model/User';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { AuthService } from 'src/app/services/auth.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { ShelterService } from 'src/app/services/shelter.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shelter-profile',
  templateUrl: './shelter-profile.component.html',
  styleUrls: ['./shelter-profile.component.less']
})
export class ShelterProfileComponent {
  constructor(
    private shelterService: ShelterService,
    private apiAddress: ApiAddressService,
    private messageService: MessageService,
    private fileUpload: UploadFileService,
    private authService: AuthService) {
  }

  protected shelter: Shelter
  protected userFullName: string;
  listProvince = new Array
  listDistrict = new Array
  listWard = new Array
  selectedDistrict;
  selectedWard;
  selectedProvince;
  protected isLoading = true;
  protected isLoadingProfile = false;
  protected selectedGender;
  protected dob: Date;
  protected onlineAdoptionPet;
  avatarFile: FileList

  protected genderOptions = [
    {
      id: 'FEMALE', value: 'Nữ'
    },
    {
      id: 'MALE', value: 'Nam'
    },
    {
      id: 'OTHER', value: 'Khác'
    }
  ]
  async ngOnInit() {
    await this.getProfile();
    await this.bindProvinces();
  }

  async getProfile() {
    this.isLoading = true;
    await this.shelterService.getShelterInfoByUserID().then(response => {
      this.shelter = response;
      console.log(this.shelter)
    })
    this.isLoading = false;
  }

  async updateUserProfile() {
    this.isLoadingProfile = true;
    this.shelter.city = this.selectedProvince.provName;
    this.shelter.district = this.selectedDistrict.distName;
    this.shelter.ward = this.selectedWard.wardName;
    if (this.avatarFile)
      await this.pushLogoToStorage();
    this.shelterService.updateShelterProfile(this.shelter).then(response => {
      this.isLoadingProfile = false;
      this.messageService.add({ key: "toast", severity: "success", detail: "Cập nhật thành công" })
    })
      .catch(err => {
        console.log(err);
        this.messageService.add({ key: "toast", severity: 'error', detail: 'Có lỗi xảy ra, vui lòng thử lại sau' })
      })
    this.isLoadingProfile = false;

  }

  async pushLogoToStorage() {
    await this.fileUpload.pushFileToStorage(this.avatarFile[0], "logo")
    this.shelter.shelterLogo = this.fileUpload.getAvatarUrl()
  }

  selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    imgInput.src = URL.createObjectURL(this.avatarFile[0])
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
      this.selectedProvince = this.listProvince.find(r => r.provName === this.shelter.city)
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
      this.selectedDistrict = this.listDistrict.find(r => r.distName === this.shelter.district)
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
      this.selectedWard = this.listWard.find(r => r.wardName === this.shelter.ward)
    }),
      err => {
        console.log(err.error.message)
      }
  }

}
