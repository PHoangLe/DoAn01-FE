import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetService } from './pet.service';
import moment from 'moment';
import { ShelterService } from './shelter.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PetAdoptionService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/adopt";
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shelterService: ShelterService) {

  }

  async sendAdoptionRequest(petID: string, shelterID: string, userID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.post(this.baseUrl + "/sendAdoptRequest", {
      animalID: petID,
      shelterID: shelterID,
      userID: userID
    }, { headers })).toPromise();
  }

  async sendOnlineAdoptionRequest(petID: string, shelterID: string, userID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.post(this.baseUrl + "/sendOnlineAdoptRequest", {
      animalID: petID,
      shelterID: shelterID,
      userID: userID
    }, { headers })).toPromise();
  }
  async getAdoptionByShelter(): Promise<any> {
    let headers = this.getHttpHeader();
    let shelterID = await this.shelterService.getShelterIDByUserID();
    return await (this.http.get(this.baseUrl + `/getAdoptionApplicationByShelterID/${shelterID}`, { headers })).toPromise()
  }

  async getOnlinePetAdoption(userID: string) {
    let headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + `/getOnlineAdoptionsByUserID/${userID}`, { headers }).toPromise();
  }



  async isAdoptedPet(petID: string, userID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.get(this.baseUrl + `/getAdoptionApplicationByUserIDAndAnimalID/${userID}/${petID}`, { headers })).toPromise()
  }

  async isOnlineAdoptedPet(petID: string, userID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.get(this.baseUrl + `/getOnlineAdoptionApplicationByUserIDAndAnimalID/${userID}/${petID}`, { headers })).toPromise()
  }

  async acceptOnlineAdoption(applicationID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.get(this.baseUrl + `/confirmOnlineAdoptionRequest/${applicationID}`, { headers })).toPromise()
  }
  async acceptAdoption(applicationID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.get(this.baseUrl + `/confirmAdoptionRequest/${applicationID}`, { headers })).toPromise()

  }

  async declineOnlineAdoption(applicationID: string) {
    let headers = this.getHttpHeader();
    return await (this.http.get(this.baseUrl + `/declineOnlineAdoptionRequest/${applicationID}`, { headers })).toPromise()
  }
  async declineAdoption(applicationID: string) {
    let headers = this.getHttpHeader();
    console.log(headers.get('Authorization'))
    return await (this.http.get(this.baseUrl + `/declineAdoptionRequest/${applicationID}`, { headers })).toPromise()
  }

  setStorageAdoption(adoption: any) {
    sessionStorage.setItem("currentAdoption", JSON.stringify(adoption));
  }

  getStorageAdoption(): any {
    return JSON.parse(sessionStorage.getItem("currentAdoption")).value
  }
  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
