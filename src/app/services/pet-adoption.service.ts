import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetService } from './pet.service';
import moment from 'moment';
import { ShelterService } from './shelter.service';


@Injectable({
  providedIn: 'root'
})
export class PetAdoptionService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/adopt";
  constructor(
    private http: HttpClient,
    private petService: PetService,
    private shelterService: ShelterService) {

  }

  async sendAdoptionRequest(petID: string, shelterID: string, userID: string): Promise<any> {
    let headers = this.getHttpHeader();
    console.log("petID: ", petID)
    console.log("userID: ", userID)
    console.log("shelterID: ", shelterID)

    return await (this.http.post(this.baseUrl + "/sendAdoptRequest", {
      animalID: petID,
      shelterID: shelterID,
      userID: userID
    }, { headers })).toPromise()
  }

  async getAdoptionByShelter(): Promise<any> {
    let headers = this.getHttpHeader();
    let shelterID = await this.shelterService.getShelterIDByUserID();
    return await (this.http.get(this.baseUrl + `/getAdoptionApplicationByShelterID/${shelterID}`, { headers })).toPromise()
  }

  async getAdoptionDetail(adoptionID: string): Promise<any> {

  }

  setStorageAdoption(adoption: any) {
    sessionStorage.setItem("currentAdoption", JSON.stringify(adoption));
  }

  getStorageAdoption(): any {
    return JSON.parse(sessionStorage.getItem("currentAdoption"));
  }
  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
