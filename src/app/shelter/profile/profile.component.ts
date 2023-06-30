import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {
  constructor(
    private userService: UserService,
    private petAdoptionService: PetAdoptionService,
    private router: Router,
    private authService: AuthService) {
    this.getProfile();
  }

  protected user: User;
  protected isLoading = true;
  ngOnInit(): void {
  }

  async getProfile() {
    await this.userService.getUser(this.authService.getDataFromCookie("userID")).then(response => {
      console.log(response)
      this.user = this.userService.convertToUser(response);
      this.user.userAvatar = localStorage.getItem("userAvatar");
    })
      .catch(err => {
        console.log(err);
      })
    await this.petAdoptionService.getOnlinePetAdoption(this.user.userID).then(response => {
      console.log(response);
    })
    this.isLoading = false;
    console.log(this.user);

  }

  registerShelterAccount() {
    this.router.navigate(['/user/request-account']);
  }

}
