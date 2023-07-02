import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RescueService } from 'src/app/services/rescue.service';
import { ChatComponent } from 'src/app/shelter/chat/chat.component';
import { RescueComponent } from 'src/app/shelter/rescue/rescue.component';

@Component({
  selector: 'app-rescue-card-shelter',
  templateUrl: './rescue-card-shelter.component.html',
  styleUrls: ['./rescue-card-shelter.component.less'],
  providers: [ChatComponent]
})
export class RescueCardShelterComponent {
  @Input() rescuePost: any;


  constructor(
    private router: Router,
    private rescueService: RescueService,
    private chat: ChatComponent,
    private messageService: MessageService,
    private rescuePage: RescueComponent

  ) { }

  ngOnInit() {
  }

  routeToRescueDetail() {
    this.rescueService.setStorageRescuePost(this.rescuePost)
    this.router.navigate([`rescue/rescue-detail/${this.rescuePost.rescuePostID}`])
  }

  contactSender() {
    sessionStorage.setItem("reciepientID", this.rescuePost.poster.userID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(this.rescuePost.poster.userID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['/chat']);
    }, 1000);
  }

  processRescue() {
    this.rescueService.processRescue(this.rescuePost.rescuePostID).then(response => {
      this.messageService.add({ key: "toast", severity: 'success', detail: 'Nhận thành công' })
      this.rescuePage.reloadPage();
    })
      .catch(error => {
        console.log(error);
        this.messageService.add({ key: "toast", severity: 'error', detail: 'Có lỗi xảy ra' })
      })
  }

}
