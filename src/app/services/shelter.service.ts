import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelter } from '../model/Shelter';
import { list } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/shelter";


  constructor(private http: HttpClient) { }

  getAllShelter() {
    let headers = this.getHttpHeader()
    return this.http.get(this.baseUrl + '/getAllShelter', { headers })
  }

  async getShelterIDByUserID(): Promise<any> {
    let headers = this.getHttpHeader();
    const response = await this.http.get(this.baseUrl + `/getShelterByUserID/${JSON.parse(localStorage.getItem("userID")).value}`, { headers }).toPromise();
    return this.toShelter(response).shelterID;
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
        item.relatedDocuments)

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
      item.relatedDocuments)
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }
}
