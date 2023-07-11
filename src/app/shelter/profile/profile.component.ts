import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Shelter } from 'src/app/model/Shelter';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { ShelterService } from 'src/app/services/shelter.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private fileUpload: UploadFileService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService) {
  }

  protected user: User;
  protected shelter: Shelter
  protected userFullName: string;
  protected isLoading = true;
  protected isLoadingProfile = false;
  protected avatarFile: FileList
  protected selectedGender;
  protected dob: Date;
  protected onlineAdoptionPet;
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
  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    await this.userService.getUser(this.authService.getDataFromCookie("userID")).then(response => {
      this.user = this.userService.convertToUser(response);
    })
      .catch(err => {
        console.log(err);
      })
    this.isLoading = false;
    this.dob = new Date(this.user.dob)
    this.selectedGender = this.genderOptions.find(option => option.id == this.user.gender);
    this.userFullName = this.user.userFirstName + " " + this.user.userLastName;

  }

  async updateUserProfile() {
    this.isLoadingProfile = true;
    this.user.userFirstName = this.userFullName.slice(0, this.userFullName.indexOf(" "))
    this.user.userLastName = this.userFullName.slice((this.userFullName.trim().indexOf(" ") + 1))
    const date = new Date(this.dob);
    this.user.dob = date.getTime();
    this.user.gender = this.selectedGender.id;
    if (this.avatarFile)
      await this.pushLogoToStorage();
    this.userService.updateUserProfile(this.user).then(response => {
      this.isLoadingProfile = false;
      this.messageService.add({ key: "toast", severity: 'success', detail: 'Cập nhật thành công' })
    })
      .catch(err => {
        console.log(err);
        this.messageService.add({ key: "toast", severity: 'error', detail: 'Có lỗi xảy ra, vui lòng thử lại sau' })

      })
  }

  async pushLogoToStorage() {
    await this.fileUpload.pushFileToStorage(this.avatarFile[0], "avatar")
    console.log("Upload")
    this.user.userAvatar = this.fileUpload.getAvatarUrl()
    console.log(this.user.userAvatar)
  }

  routeToShelterProfile() {
    this.router.navigate([`/shelter/shelter-profile`])
  }

  selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    imgInput.src = URL.createObjectURL(this.avatarFile[0])
  }

}
