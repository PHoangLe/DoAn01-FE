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

  public chatMessages = new Array<string>();

  async ngOnInit() {
    await this.getChatRoom();
    this.connect();
    this.listMessage = this.getMessage();
    this.getListUsers();
  }



  sendMessage() {
    if (this.message) {
      this.sendValue(this.message);

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
    this.setReceipientID(user.userID);

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


  setUserName(name: string) {
    this.messageData.senderID = name;
  }

  setMessage(message: string) {
    this.messageData.message = message;
  }

  public setSenderID(senderID: string) {
    this.messageData.senderID = senderID;
  }

  public setReceipientID(recipientID: string) {
    this.messageData.recipientID = recipientID;
  }

  getMessage() {
    return this.chatMessages;
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
    this.chatMessages.push(payloadData);
  }


  onPrivateMessage = (payload) => {
    console.log("this is received message: ", payload);
    var payloadData = JSON.parse(payload.body);
    this.chatMessages.push(payloadData);
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
      this.setMessage("");
    }
  }

}
