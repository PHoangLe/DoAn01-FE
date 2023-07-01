import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelter } from '../model/Shelter';
import { list } from 'firebase/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/shelter";


  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllShelter() {
    return this.http.get(this.baseUrl + '/getAllShelter')
  }

  async getShelterIDByUserID(): Promise<any> {
    let headers = this.getHttpHeader();
    const response = await this.http.get(this.baseUrl + `/getShelterByUserID/${this.authService.getDataFromCookie("userID")}`, { headers }).toPromise();
    return this.toShelter(response).shelterID;
  }

  async getShelterByShelterID(shelterID: string) {
    let headers = this.getHttpHeader();
    const response = await this.http.get(this.baseUrl + `/getShelterByShelterID/${shelterID}`, { headers }).toPromise();
    return this.toShelter(response).shelterName;
  }

  convertToShelter(input: any): Shelter[] {
    var listShelter = new Array<Shelter>
    input.forEach(item => {
      const shelter = new Shelter(
        item.shelterID,
        item.userID,
        item.shelterName,
        item.representativeFacebookLink,
        item.representativeEmailAddress,
        item.unitNoAndStreet,
        item.ward,
        item.district,
        item.city,
        item.shelterPhoneNo,
        item.relatedDocuments,
        item.totalFundReceived)

      listShelter.push(shelter)
    });
    return listShelter
  }

  toShelter(item: any): Shelter {
    return new Shelter(
      item.shelterID,
      item.userID,
      item.shelterName,
      item.representativeFacebookLink,
      item.representativeEmailAddress,
      item.unitNoAndStreet,
      item.ward,
      item.district,
      item.city,
      item.shelterPhoneNo,
      item.relatedDocuments,
      item.totalFundReceived)
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }
}
