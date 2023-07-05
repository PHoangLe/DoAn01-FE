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
    return await this.http.get(this.baseUrl).toPromise()
  }

  getFundTransactions(transactionID: string) {
    let headers = this.getHttpHeader();
    return this.http.get(`${this.baseUrl}/transactions/fund/${transactionID}`, { headers: headers }).toPromise();
  }

  getUserTransactions(transactionID: string) {
    let headers = this.getHttpHeader();
    return this.http.get(`${this.baseUrl}/transactions/user/${transactionID}`, { headers: headers }).toPromise();
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
