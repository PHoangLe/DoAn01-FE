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
  isLoading = false;

  constructor(
    private router: Router,
    private rescueService: RescueService,
    private chat: ChatComponent,
    private messageService: MessageService,
    private rescuePage: RescueComponent

  ) { }

  ngOnInit() {
    this.isLoading = false;
    if (this.rescuePost.images.length == 0) {
      this.rescuePost.images = ["https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/General%2Ferror_img.jpg?alt=media&token=9a5285d5-8aae-421f-ad9f-e794f2524b31"]
    }
  }

  routeToRescueDetail() {
    this.rescueService.setStorageRescuePost(this.rescuePost)
    this.router.navigate([`shelter/rescue-detail/${this.rescuePost.rescuePostID}`])
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

  async processRescue() {
    this.isLoading = true;
    await this.rescueService.processRescue(this.rescuePost.rescuePostID).then(response => {
      this.rescuePage.removePostFromList(this.rescuePost.rescuePostID);
      this.messageService.add({ key: "toast", severity: 'success', detail: 'Nhận thành công' })

    })
      .catch(error => {
        console.log(error);
        this.messageService.add({ key: "toast", severity: 'error', detail: 'Có lỗi xảy ra' })
      })
    this.isLoading = false;
  }

}
