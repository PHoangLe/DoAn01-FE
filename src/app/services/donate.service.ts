import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/donations";

  constructor(private http: HttpClient, private authService: AuthService) { }


  async completeDonation(userID, fundID, numsOfPackage) {
    console.log(userID)
    console.log(fundID)
    console.log(numsOfPackage)

    let headers = this.getHttpHeader()
    return await this.http.post(this.baseUrl, {
      userID: userID,
      fundID: fundID,
      numsOfPackage: numsOfPackage
    }, { headers: headers }).toPromise();
  }
  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
