import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RescueService } from 'src/app/services/rescue.service';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-rescue-detail',
  templateUrl: './rescue-detail.component.html',
  styleUrls: ['./rescue-detail.component.less'],
  providers: [ChatComponent]
})
export class RescueDetailComponent {
  rescuePost: any;
  breadcrumbItimes: MenuItem[];
  async ngOnInit() {
    await this.getPageData();
  }

  constructor(
    private rescueService: RescueService,
    private router: Router,
    private chat: ChatComponent,
    private messageService: MessageService,
    private locationStrategy: LocationStrategy
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

  acceptRescuePost() {
    this.rescueService.processRescue(this.rescuePost.rescuePostID).then(response => {
      this.messageService.add({ key: 'toast', severity: 'success', detail: 'Nhận giải cứu thành công!' });
      setTimeout(() => {
        this.backToRescuePage();
      }, 1500)

    })
      .catch(err => {
        console.log(err);
      })
  }

  abortRescuePost() {
    this.rescueService.abortRescue(this.rescuePost.rescuePostID).then(response => {
      this.messageService.add({ key: 'toast', severity: 'success', detail: 'Huỷ giải cứu thành công!' });
      setTimeout(() => {
        this.backToRescuePage();
      }, 1500)

    })
      .catch(err => {
        console.log(err);
      })
  }

  completeRescuePost() {
    this.rescueService.completeRescue(this.rescuePost.rescuePostID).then(response => {
      this.messageService.add({ key: 'toast', severity: 'success', detail: 'Giải cứu thành công!' });
      setTimeout(() => {
        this.backToRescuePage();
      }, 1500)
    })
      .catch(err => {
        console.log(err);
      })
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

  public backToRescuePage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`shelter/rescue`])
    });
  }

  getFirstWord(string: string) {
    return string.split(" ")[0];
  }

  getLastWord(string: string) {
    return string.slice((string.trim().indexOf(" ") + 1))
  }

  getDistrictName(string: string) {
    if (this.rescuePost.district.includes("Thành phố"))
      return string.slice(9)
    return string.slice(6)

  }

  getTwoFirstWords(string: string) {
    return string.split(" ", 2).join(" ");
  }

  getCityName(string: string) {
    return string.slice(9)
  }
}
