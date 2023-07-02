import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/rescue-posts";
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sheltersService: ShelterService
  ) { }

  getAllRescuePosts() {
    let headers = this.getHttpHeader();
    return this.http.get(this.baseUrl + `/user/${this.authService.getDataFromCookie('userID')}`, { headers: headers }).toPromise();
  }

  createNewPost(postInfo, listImgs) {
    let headers = this.getHttpHeader();
    const userID = this.authService.getDataFromCookie('userID');

    return this.http.post(this.baseUrl, {
      images: listImgs,
      userID: userID,
      animalDescription: postInfo.rescuePetDetail ? postInfo.rescuePetDetail : "",
      locationDescription: postInfo.rescuePetPosition ? postInfo.rescuePetPosition : "",
      street: postInfo.rescuePetNo,
      ward: postInfo.rescuePetWard.wardName,
      district: postInfo.rescuePetDistrict.distName,
      city: postInfo.rescuePetProvince.provName
    }, { headers: headers }).toPromise();
  }
  async updateRescuePost(postInfo, listImgs) {
    let headers = this.getHttpHeader();
    return await this.http.put(this.baseUrl + `/${postInfo.rescuePostID}`, {
      images: listImgs ? listImgs : postInfo.images,
      userID: postInfo.poster.userID,
      animalDescription: postInfo.animalDescription ? postInfo.animalDescription : "",
      locationDescription: postInfo.locationDescription ? postInfo.locationDescription : "",
      street: postInfo.street,
      ward: postInfo.ward,
      district: postInfo.district,
      city: postInfo.city
    }, { headers: headers }).toPromise();
  }

  async deleteRescuePost(rescueID: string) {
    let headers = this.getHttpHeader();
    return await this.http.delete(this.baseUrl + `${rescueID}`, { headers: headers }).toPromise();
  }

  async getAllRescueByShelter() {
    let headers = this.getHttpHeader();
    const shelterID = await this.sheltersService.getShelterIDByUserID();
    return await this.http.get(this.baseUrl + `/shelter-page/${shelterID}`, { headers: headers }).toPromise();
  }

  async processRescue(rescueID: string) {
    let headers = this.getHttpHeader();
    const shelterID = await this.sheltersService.getShelterIDByUserID();
    return await this.http.put(this.baseUrl + `/process-post/${shelterID}/${rescueID}`, null, { headers: headers }).toPromise();
  }

  async completeRescue(rescueID: string) {
    let headers = this.getHttpHeader();
    const shelterID = await this.sheltersService.getShelterIDByUserID();
    return await this.http.put(this.baseUrl + `/complete-post/${rescueID}`, null, { headers: headers }).toPromise();
  }

  async abortRescue(rescueID: string) {
    let headers = this.getHttpHeader();
    return await this.http.put(this.baseUrl + `/abort-post/${rescueID}`, null, { headers: headers }).toPromise();
  }



  setStorageRescuePost(rescuePost) {
    sessionStorage.setItem("currentRescuePost", JSON.stringify(rescuePost));
  }

  getStorageRescuePost() {
    return JSON.parse(sessionStorage.getItem("currentRescuePost"));
  }

  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }
}
