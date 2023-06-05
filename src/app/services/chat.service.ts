import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/chat/";

  constructor(private http: HttpClient) {
  }


  async getChatRooom() {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "getAllChatRoomByUserID/" + `${JSON.parse(localStorage.getItem("userID")).value}`, { headers }).toPromise();
  }

  async getMessageByChatRoom(senderID: string, recipientID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + "getAllMessageBySenderIDAndRecipientID/" + `${senderID}/` + `${recipientID}`, { headers }).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
