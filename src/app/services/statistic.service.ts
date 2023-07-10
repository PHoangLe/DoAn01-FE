import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/statistic/";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shelterService: ShelterService) { }

  getLandingStatistic() {
    return this.http.get(this.baseUrl + 'landing-page').toPromise();
  }

  async getShelterLandingStatistic() {
    let headers = this.getHttpHeader();
    const shelterID = await this.shelterService.getShelterIDByUserID();
    return await this.http.get(this.baseUrl + `shelter-dashboard/${shelterID}`).toPromise();

  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }
}
