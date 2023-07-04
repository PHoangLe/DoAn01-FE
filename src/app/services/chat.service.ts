import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/chat/";

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  async getChatRooom() {
    return await this.http.get(this.baseUrl + "getAllChatRoomByUserID/" + `${this.authService.getDataFromCookie("userID")}`).toPromise();
  }

  async getMessageByChatRoom(chatRoom: string, senderID: string, recipientID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "getAllMessageBySenderIDAndRecipientID/" + `${chatRoom}/` + `${senderID}/` + `${recipientID}`).toPromise();
  }

  async getUnreadMessageByRecipientID(recipientID: string, senderID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "messages/" + `${senderID}/` + `${recipientID}/count`).toPromise();
  }

  putSeenMessage(senderID: string, recipientID: string) {
    let headers = this.getHttpHeader();
    return this.http.put(this.baseUrl + "seenMessage/" + `${senderID}/` + `${recipientID}`, null).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
