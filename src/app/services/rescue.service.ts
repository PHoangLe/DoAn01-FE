import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/rescue-posts";
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllRescuePosts() {
    let headers = this.getHttpHeader();
    return this.http.get(this.baseUrl + `/${this.authService.getDataFromCookie('userID')}`).toPromise();
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }
}
