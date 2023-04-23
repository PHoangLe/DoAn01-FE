import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root'
})
export class PetAdoptService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/animal/";
  constructor(private http: HttpClient, private shelterService: ShelterService) { }

  getAllPets() {
    const token = JSON.parse(localStorage.getItem("jwtToken")).value;
    let headers = new HttpHeaders({
      'Authorization': `Bearer {${token}}`,
    });
    return this.http.get(this.baseUrl + 'getAllAnimals', { headers })
  }

}
