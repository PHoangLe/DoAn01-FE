import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Fund } from '../model/Fund';

@Injectable({
  providedIn: 'root'
})
export class FundService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/funds";

  constructor(private http: HttpClient, private authService: AuthService) { }


  async getAllFunds() {
    let headers = this.getHttpHeader();

    return await this.http.get(this.baseUrl, { headers: headers }).toPromise()
  }

  convertToFundType(input: any) {
    var fundList = new Array<Fund>
    input.forEach(item => {
      const fund = new Fund(
        item.fundID,
        item.fundName,
        item.fundCover,
        item.fundDescription,
        item.valuePerDonationPackage,
        item.fundType,
        item.fundBalance
      )
      fundList.push(fund)
    });
    return fundList
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
