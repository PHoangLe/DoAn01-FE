import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/shelter";


constructor(private http: HttpClient) { }

getAllShelter(){
  const token = JSON.parse(localStorage.getItem("jwtToken")).value;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    console.log(headers.get("Authorization"))
  return this.http.get(this.baseUrl+ '/getAllShelter',{headers})
}

}
