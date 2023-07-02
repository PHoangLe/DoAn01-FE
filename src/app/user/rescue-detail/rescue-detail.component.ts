import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ChatService } from 'src/app/services/chat.service';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { RescueService } from 'src/app/services/rescue.service';
import { ChatComponent } from 'src/app/shelter/chat/chat.component';

@Component({
  selector: 'app-rescue-detail',
  templateUrl: './rescue-detail.component.html',
  styleUrls: ['./rescue-detail.component.less'],
  providers: [ChatComponent]

})
export class RescueDetailComponent implements OnInit {
  rescuePost: any;
  breadcrumbItimes: MenuItem[];
  async ngOnInit() {
    await this.getPageData();
  }

  constructor(
    private rescueService: RescueService,
    private router: Router,
    private chat: ChatComponent

  ) {

  }

  async getPageData() {
    this.rescuePost = this.rescueService.getStorageRescuePost();
    console.log(this.rescuePost);
    this.breadcrumbItimes = [
      {
        label: 'Cứu trợ',
        command: () => {
          this.router.navigate(['/user/rescue'])
        }

      },
      {
        label: 'Chi tiết cứu trợ',

      }
    ]
  }

  acceptRequest() {

  }

  rejectRequest() {

  }

  contactRequestor() {
    sessionStorage.setItem("reciepientID", this.rescuePost.user.userID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(this.rescuePost.user.userID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['/chat']);
    }, 1000);
  }

  getFirstWord(string: string) {
    return string.split(" ")[0];
  }

  getLastWord(string: string) {
    return string.slice((string.trim().indexOf(" ") + 1))
  }

  getDistrictName(string: string) {
    return string.slice(6)
  }

  getTwoFirstWords(string: string) {
    return string.split(" ", 2).join(" ");
  }

  getCityName(string: string) {
    return string.slice(9)
  }

}
