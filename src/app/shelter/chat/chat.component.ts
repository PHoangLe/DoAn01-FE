import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService) {
  }

  listMessage: any
  listUsers: any;
  message: string;
  recipientID: string;
  userID = JSON.parse(localStorage.getItem("userID")).value;
  ngOnInit(): void {
    this.chatService.connect();
    this.listMessage = this.chatService.getMessage();

    this.listUsers = [
      {
        userID: "64283c2f112a7d617e0d1cf9",
        userName: "Anh Quan",
        userAvatar: "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
      },
      {
        userID: "642842c33fc47402c13d9ffb",
        userName: "Phúc mập chó điên",
        userAvatar: "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
      }
    ]
  }



  sendMessage() {
    this.chatService.sendValue(this.message);
    this.listMessage.push({
      senderID: this.userID,
      recipientID: "",
      content: this.message
    })
    console.log(this.listMessage)
    this.message = null;

  }

  selectUser(user) {
    console.log(user);
    this.recipientID = user.userID;
    this.chatService.setReceipientID(user.userID);
  }


}
