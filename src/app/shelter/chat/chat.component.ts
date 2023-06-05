import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
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
  listUsersBackup: any;
  message: string;
  rawMessages: any;
  recipientID: string;
  senderID = JSON.parse(localStorage.getItem("userID")).value;
  senderAvatar = JSON.parse(localStorage.getItem("userAvatar")).value;
  currentUser: any;
  currentUserChat: any;
  userSearch: string;
  private stompClient = null;
  private messageData = {
    senderID: JSON.parse(localStorage.getItem("userID")).value,
    recipientID: '',
    message: ''
  }


  async ngOnInit() {
    await this.connect();
    await this.getChatRoom();
    this.getListUsers();
  }

  async sendMessage() {
    if (this.message) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      await this.sendValue(this.message);
      this.currentUserChat.push({
        senderID: this.senderID,
        recipientID: "",
        content: this.message,
        timestamp: timestamp,
        status: "DELIVERED"
      })
      this.message = null;
    }
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 10);

  }

  async selectUser(user) {
    this.recipientID = user.userID;
    this.currentUser = user;
    this.setReceipientID(this.recipientID);
    await this.getListMessages(user.chatRoomID);
    this.getListMessageByRecipientID(this.recipientID);

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
    this.listUsersBackup = [...this.listUsers]

  }

  async getChatRoom() {
    await this.chatService.getChatRooom().then((chatRoom) => {
      this.listChatRoom = chatRoom
    })
      .catch((error) => {
        console.log(error)
      })
  }

  async getListMessages(chatRoomID: string) {
    await this.chatService.getMessageByChatRoom(chatRoomID, this.senderID, this.recipientID).then((messages) => {
      this.rawMessages = messages;
      console.log(this.rawMessages);
    }
    ).catch((error) => {
      console.log(error)
    })
    this.listMessage = await this.rawMessages.map((message) => {
      return {
        senderID: message.senderID,
        recipientID: message.recipientID,
        content: message.content,
        timestamp: message.timestamp,
        status: message.status
      }
    })
    console.log("senderID: " + this.senderID)
    console.log("recipientID ", this.recipientID)
    console.log(this.listMessage)
  }

  getListMessageByRecipientID(recipientID: string) {
    this.currentUserChat = this.listMessage.map((message) => {
      if (message.recipientID === recipientID || message.senderID === recipientID)
        return message
    })
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 10);

  }

  onUserSearched() {
    this.listUsers = [...this.listUsersBackup]
    this.listUsers = this.listUsers.filter((room) => {
      if (room.userName.includes(this.userSearch)) {
        return room;
      }
      else {
        return
      }
    })
  }

  autoScrollToNewMessage() {
    const chatContent = document.getElementById('boxchat')
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  public setReceipientID(recipientID: string) {
    this.messageData.recipientID = recipientID;
  }



  public connect() {
    let Sock = new SockJS('https://doan01-be-production.up.railway.app/ws');
    // let Sock = new SockJS('http://localhost:8080/ws');

    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    this.stompClient.subscribe('/private-message', this.onMessageSend);
    this.stompClient.subscribe('/user/' + JSON.parse(localStorage.getItem("userID")).value + '/private', this.onPrivateMessage);
  }

  onMessageSend = (payload) => {
    console.log("message sent")
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
  }


  onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
    this.getListMessageByRecipientID(this.recipientID)
  }

  onError = (err) => {
    console.log(err);

  }


  sendValue(message) {
    if (this.stompClient) {
      var chatMessage = {
        senderID: this.messageData.senderID,
        recipientID: this.messageData.recipientID,
        content: message
      };
      console.log(chatMessage);
      this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      this.messageData.message = "";
    }
  }

}
