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

  listChatRoom: any;
  listUsers: UserMessage[];
  listUsersBackup: UserMessage[];
  rawMessages: any;
  public listMessage = new Array<Message>();
  currentUser: any;
  currentUserChat: any;

  userSearch: string;
  message: string;
  recipientID: string;

  senderID = JSON.parse(localStorage.getItem("userID")).value;
  senderAvatar = JSON.parse(localStorage.getItem("userAvatar")).value;

  private stompClient = null;
  private messageData = {
    senderID: JSON.parse(localStorage.getItem("userID")).value,
    recipientID: '',
    message: ''
  }


  async ngOnInit() {
    await this.connect();
    await this.getChatRoom();
    await this.getListUsers();
    await this.getUnreadMessage();

  }

  async sendMessage() {
    if (this.message) {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      await this.sendValue(this.message);
      this.currentUserChat.push({
        chatRoomID: this.currentUser.chatRoomID,
        senderID: this.senderID,
        recipientID: this.recipientID,
        content: this.message,
        timestamp: timestamp,
        status: "DELIVERED"
      })
      this.listMessage.push({
        chatRoomID: this.currentUser.chatRoomID,
        senderID: this.senderID,
        recipientID: this.recipientID,
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
    this.listUsers.map((selectedUser) => {
      if (user.userID === selectedUser.userID)
        selectedUser.isRead = true;
    })
    setTimeout(() => {
      this.autoScrollToNewMessage();
    }, 10);

  }

  public getListUsers() {
    this.listUsers = this.listChatRoom.map((chatRoom) => {
      if (chatRoom.user1.userID !== this.senderID) {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user1.userID,
          userName: chatRoom.user1.userFirstName + " " + chatRoom.user1.userLastName,
          userAvatar: chatRoom.user1.userAvatar,
          isRead: false
        };
      }
      else {
        return {
          chatRoomID: chatRoom.chatRoomID,
          userID: chatRoom.user2.userID,
          userName: chatRoom.user2.userFirstName + " " + chatRoom.user2.userLastName,
          userAvatar: chatRoom.user2.userAvatar,
          isRead: false
        };
      }
    })
    this.listUsersBackup = [...this.listUsers]
    console.log(this.listUsersBackup)

  }

  public async getChatRoom() {
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
    }
    ).catch((error) => {
      console.log(error)
    })
    this.currentUserChat = await this.rawMessages.map((message) => {
      return {
        senderID: message.senderID,
        recipientID: message.recipientID,
        content: message.content,
        timestamp: message.timestamp,
        status: message.status
      }
    })
  }

  getUnreadMessage() {
    this.listUsers.map((user) => {
      this.chatService.getUnreadMessageByRecipientID(user.userID, this.senderID).then((messageCount) => {
        console.log(user.userID + " " + messageCount)
        if (messageCount === 0)
          user.isRead = true
      })
        .catch((error) => {
          console.log(error)
        })
    })
  }



  onUserSearched() {
    this.listUsers = [...this.listUsersBackup]
    this.listUsers = this.listUsers.filter((room) => {
      if (room.userName.includes(this.userSearch))
        return room;
      else
        return 0;

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
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
  }

  onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.listMessage.push(payloadData);
    this.listUsers.map((user) => {
      if (user.userID === payloadData.senderID)
        user.isRead = false
    })
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
export interface UserMessage {
  chatRoomID: string;
  userID: string;
  userName: string;
  userAvatar: string;
  isRead: boolean;
}

export interface Message {
  chatRoomID: string,
  senderID: string,
  recipientID: string,
  content: string,
  timestamp: any,
  status: string
}
