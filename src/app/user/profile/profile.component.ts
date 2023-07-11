import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { FundService } from 'src/app/services/fund.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private petAdoptionService: PetAdoptionService,
    private router: Router,
    private petService: PetService,
    private messageService: MessageService,
    private fileUpload: UploadFileService,
    private fundService: FundService,
    private authService: AuthService) {
  }

  protected user: User;
  protected userFullName: string;
  protected isLoading = true;
  protected isLoadingProfile = false;
  protected avatarFile: FileList
  protected selectedGender;
  protected dob: Date;
  protected listTransactions;
  private pet: Pet;
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
    this.getShelterFundTransactions();
  }

  async getProfile() {
    await this.userService.getUser(this.authService.getDataFromCookie("userID")).then(response => {
      this.user = this.userService.convertToUser(response);
    })
      .catch(err => {
        console.log(err);
      })
    await this.petAdoptionService.getOnlinePetAdoption(this.user.userID).then(response => {
      console.log(response)
      this.onlineAdoptionPet = response;
    })
    this.isLoading = false;
    this.dob = new Date(this.user.dob)
    this.selectedGender = this.genderOptions.find(option => option.id == this.user.gender);
    this.userFullName = this.user.userFirstName + " " + this.user.userLastName;
    console.log(this.user)
  }

  registerShelterAccount() {
    this.router.navigate(['/user/request-account']);
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

  selectedAvatar(event) {
    this.avatarFile = event.target.files;
    const imgInput = <HTMLImageElement>document.getElementById("imgInput")
    imgInput.src = URL.createObjectURL(this.avatarFile[0])
  }

  async routeToPetDetails(petID: string) {
    this.isLoading = true;
    await this.petService.getPetById(petID).then((response) => {
      this.pet = this.petService.convertToPet(response)

    })
    this.petService.setStoragePet(this.pet)
    this.router.navigate([`/user/pet-detail/${petID}`])
  }

  async getShelterFundTransactions() {
    this.isLoading = true;
    await this.fundService.getUserTransactions(this.authService.getDataFromCookie("userID")).then((transactions) => {
      this.listTransactions = transactions;
      console.log(this.listTransactions);
    })
    this.isLoading = false;
  }
}
