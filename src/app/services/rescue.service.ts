import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RescueService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/rescue-posts";
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllRescuePosts() {
    let headers = this.getHttpHeader();
    return this.http.get(this.baseUrl + `/user/${this.authService.getDataFromCookie('userID')}`, { headers: headers }).toPromise();
  }

  createNewPost(postInfo, listImgs) {
    let headers = this.getHttpHeader();
    const userID = this.authService.getDataFromCookie('userID');
    console.log(`createNewPost`, postInfo)
    console.log(`listImgs`, listImgs)

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
