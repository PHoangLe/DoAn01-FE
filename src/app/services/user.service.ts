import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/user";

  constructor(private http: HttpClient, private authService: AuthService) { }


  async getUser(userID: string): Promise<any> {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + '/getUserByID/' + userID, { headers }).toPromise();
  }

  convertToUser(input: any): User {
    return new User(
      input.userID,
      input.userEmail,
      input.userFirstName,
      input.userLastName,
      input.phoneNumber ? input.phoneNumber : 'Chưa có',
      input.dob,
      input.userAvatar ? input.userAvatar : "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963",
      input.userRoles,
      input.isLocked,
      input.isEnabled,
      input.isDeleted,
    )
  }
  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }
}
