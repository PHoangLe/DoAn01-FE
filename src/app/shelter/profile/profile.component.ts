import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
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
    private router: Router) {
    this.getProfile();
  }

  protected user: User;
  protected isLoading = true;
  ngOnInit(): void {
  }

  async getProfile() {
    console.log(JSON.parse(localStorage.getItem('userID')).value)
    await this.userService.getUser(JSON.parse(localStorage.getItem('userID')).value).then(response => {
      this.user = this.userService.convertToUser(response);
      console.log(response)
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
