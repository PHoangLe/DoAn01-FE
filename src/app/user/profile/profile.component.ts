import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
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
    private authService: AuthService) {
  }

  protected user: User;
  protected isLoading = true;
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
  ngOnInit(): void {
    this.getProfile();

  }

  async getProfile() {
    await this.userService.getUser(this.authService.getDataFromCookie("userID")).then(response => {
      this.user = this.userService.convertToUser(response);
      this.user.userAvatar = localStorage.getItem("userAvatar");
    })
      .catch(err => {
        console.log(err);
      })
    await this.petAdoptionService.getOnlinePetAdoption(this.user.userID).then(response => {
      this.onlineAdoptionPet = response;
    })
    this.isLoading = false;
    this.dob = new Date(this.user.dob)
    this.selectedGender = this.genderOptions.find(option => option.id == this.user.gender);
  }

  registerShelterAccount() {
    this.router.navigate(['/user/request-account']);
  }

  updateUserProfile() {
    const date = new Date(this.dob);
    this.user.dob = date.getTime();
    this.user.gender = this.selectedGender.id;
    this.userService.updateUserProfile(this.user).then(response => {
      console.log(response);
    })
      .catch(err => {
        console.log(err);
      })
  }

  routeToPetDetails(petID: string) {
    this.router.navigate([`/user/pet-detail/${petID}`])
  }
}
