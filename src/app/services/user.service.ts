import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/user";

  constructor(private http: HttpClient) { }


  async getUser(emailOrID: string): Promise<any> {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + '/getUserByEmail/' + emailOrID, { headers }).toPromise();
  }
  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }
}
