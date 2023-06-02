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
  listChatRoom: any;
  message: string;
  rawMessages: any;
  recipientID: string;
  senderID = JSON.parse(localStorage.getItem("userID")).value;
  currentUser: any;
  currentUserChat: any;

  async ngOnInit() {
    await this.getChatRoom();
    this.chatService.connect();
    this.listMessage = this.chatService.getMessage();
    this.getListUsers();
  }



  sendMessage() {
    if (this.message) {
      this.chatService.sendValue(this.message);

      this.listMessage.push({
        senderID: this.senderID,
        recipientID: "",
        content: this.message
      })
      this.message = null;
    }
  }

  selectUser(user) {
    this.recipientID = user.userID;
    this.currentUser = user;
    console.log("user ", user)
    this.chatService.setReceipientID(user.userID);

    this.getListMessages(user.chatRoomID);
    console.log(this.listMessage)

  }

  getListUsers() {
    this.listUsers = this.listChatRoom.map((chatRoom) => {
      if (chatRoom.user1.userID !== this.senderID) {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user1.userID,
          userName: chatRoom.user1.userFirstName + " " + chatRoom.user1.userLastName, userAvatar: chatRoom.user1.userAvatar
        };
      }
      else {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user2.userID,
          userName: chatRoom.user2.userFirstName + " " + chatRoom.user2.userLastName, userAvatar: chatRoom.user2.userAvatar
        };
      }
    })
    console.log(this.listUsers);

  }

  async getChatRoom() {
    await this.chatService.getChatRooom().then((chatRoom) => {
      this.listChatRoom = chatRoom
      console.log(this.listChatRoom);

    })
      .catch((error) => {
        console.log(error)
      })
  }

  async getListMessages(chatRoomID: string) {
    await this.chatService.getMessageByChatRoom(chatRoomID).then((messages) => {
      this.rawMessages = messages;
    }
    ).catch((error) => {
      console.log(error)
    })
    this.listMessage = this.rawMessages.map((message) => {
      return {
        senderID: message.senderID,
        recipientID: message.recipientID,
        content: message.content,
        timestamp: message.timestamp
      }
    })
    console.log("messages: ", this.listMessage)
  }


}
