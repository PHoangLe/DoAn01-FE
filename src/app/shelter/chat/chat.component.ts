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
  message: string;
  rawMessages: any;
  recipientID: string;
  senderID = JSON.parse(localStorage.getItem("userID")).value;
  currentUser: any;
  currentUserChat: any;

  private stompClient = null;
  private messageData = {
    senderID: JSON.parse(localStorage.getItem("userID")).value,
    recipientID: '',
    message: ''
  }


  async ngOnInit() {
    await this.getChatRoom();
    this.connect();
    this.getListUsers();
  }



  async sendMessage() {
    if (this.message) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      await this.sendValue(this.message);
      this.listMessage.push({
        senderID: this.senderID,
        recipientID: "",
        content: this.message,
        timestamp: timestamp
      })
      this.message = null;
    }
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 100);

  }

  async selectUser(user) {
    this.recipientID = user.userID;
    this.currentUser = user;
    console.log("user ", user)
    await this.setReceipientID(user.userID);
    await this.getListMessages(user.chatRoomID);
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 300);

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
    this.listMessage = await this.rawMessages.map((message) => {
      return {
        senderID: message.senderID,
        recipientID: message.recipientID,
        content: message.content,
        timestamp: message.timestamp
      }
    })
    console.log(this.listMessage)
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
    console.log("this is received message: ", payload);
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
    console.log("payloadData ", payloadData)
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
      this.stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      this.messageData.message = "";
    }
  }

}
