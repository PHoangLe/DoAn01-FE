import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetService } from './pet.service';

@Injectable({
  providedIn: 'root'
})
export class PetAdoptionService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/adopt";
  constructor(
    private http: HttpClient,
    private petService: PetService) {

  }

  async sendAdoptionRequest(input: any): Promise<any> {
    let headers = this.getHttpHeader();
    return await (this.http.post(this.baseUrl + "/sendAdoptRequest", {

    }, { headers })).toPromise()
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
