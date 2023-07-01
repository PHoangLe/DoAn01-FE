import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FundService } from './fund.service';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root'
})
export class RequestFundService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/funding-requests";

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fundService: FundService,
    private shelterService: ShelterService) { }

  async sendRequest(request) {
    let headers = this.getHttpHeader();
    const shelterID = await this.shelterService.getShelterIDByUserID();
    return await this.http.post(this.baseUrl, {
      fundID: request.fundType.fundID,
      shelterID: shelterID,
      reason: request.requestDescription,
      value: request.requestValue

    }, { headers: headers }).toPromise();
  }


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
