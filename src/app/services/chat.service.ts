import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient = null;
  private socket: any;
  private url = 'ApiPath/ws'; // địa chỉ của WebSocket server
  private messageData = {
    senderID: JSON.parse(localStorage.getItem("userID")).value,
    recipientID: '',
    message: ''
  }

  chatMessages = new Array<string>();
  constructor() {
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
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  public onConnected = () => {
    this.stompClient.subscribe('/private-message', this.onMessageReceived);
    this.stompClient.subscribe('/user/' + JSON.parse(localStorage.getItem("userID")).value + '/private', this.onPrivateMessage);
  }

  onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.chatMessages.push(payloadData);
    console.log("payload message: ", JSON.parse(payload))
  }


  onPrivateMessage = (payload) => {
    console.log("this is received message: ", payload);
    var payloadData = JSON.parse(payload.body);
    this.chatMessages.push(payloadData);
  }

  onError = (err) => {
    console.log(err);

  }

  handleMessage = (event) => {
    const { value } = event.target;
    this.setMessage(value);
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
      this.setMessage("");
    }
  }


  handleUsername = (event) => {
    const { value } = event.target;
    this.setUserName(value);
  }

  registerUser = () => {
    this.connect();
  }

}
