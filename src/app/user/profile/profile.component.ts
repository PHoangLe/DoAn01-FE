import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService) {
    this.getProfile();
  }

  protected user: User;
  ngOnInit(): void {
  }

  async getProfile() {
    console.log(JSON.parse(localStorage.getItem('userID')).value)
    await this.userService.getUser(JSON.parse(localStorage.getItem('userID')).value).then(response => {
      this.user = this.userService.convertToUser(response);
    })
      .catch(err => {

      })
  }

}
