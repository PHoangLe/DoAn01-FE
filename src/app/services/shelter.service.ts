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
    const token = JSON.parse(localStorage.getItem("jwtToken")).value;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(this.baseUrl + '/getAllShelter', { headers })
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

}
