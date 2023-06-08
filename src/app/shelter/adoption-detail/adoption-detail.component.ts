import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.component.html',
  styleUrls: ['./adoption-detail.component.less'],
  providers: [ChatComponent]
})
export class AdoptionDetailComponent implements OnInit {
  requestInfo: any;
  breadcrumbItimes: MenuItem[];
  ngOnInit(): void {
    this.getPageData();
  }

  constructor(
    private messageService: MessageService,
    private petAdoptionService: PetAdoptionService,
    private chat: ChatComponent,
    private router: Router) {

  }

  async getPageData() {
    this.requestInfo = await this.petAdoptionService.getStorageAdoption();
    console.log(this.requestInfo.applicationID)

    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi',
        command: () => {
          this.router.navigate(['/shelter/adopt'])
        }

      },
      {
        label: 'Yêu cầu nhận nuôi',
        command: () => {
          this.router.navigate(['/shelter/adopt/adoption-request'])
        }
      },
      {
        label: this.requestInfo.animal.animalName
      }
    ]
  }

  acceptRequest() {
    this.petAdoptionService.acceptAdoption(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "messageService", severity: 'success', detail: 'Chấp nhận yêu cầu' })
    })
  }

  rejectRequest() {
    console.log(this.requestInfo.applicationID)
    this.petAdoptionService.declineAdoption(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "messageService", severity: 'warning', detail: 'Từ chối yêu cầu' })
    })
  }

  contactRequestor() {
    sessionStorage.setItem("reciepientID", this.requestInfo.user.userID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(this.requestInfo.user.userID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['/chat']);
    }, 1000);

  }

}
