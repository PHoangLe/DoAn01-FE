import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient = null;
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/chat/";
  private socket: any;
  private messageData = {
    senderID: JSON.parse(localStorage.getItem("userID")).value,
    recipientID: '',
    message: ''
  }

  chatMessages = new Array<string>();
  constructor(private http: HttpClient) {
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

  async getChatRooom() {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "getAllChatRoomByUserID/" + `${JSON.parse(localStorage.getItem("userID")).value}`, { headers }).toPromise();
  }

  async getMessageByChatRoom(chatRoomID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "getAllMessageByChatRoomID/" + `${chatRoomID}`, { headers }).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
