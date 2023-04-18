import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UploadFileService } from './upload-file.service';


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer `
  })
};
@Injectable({
  providedIn: 'root'
})
export class RequestShelterAccountService {


  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/shelter/";

  constructor(private http: HttpClient) { }

  sendRequest(inputData: any, relatedDoc: string[]): Observable<any> {
    const token = localStorage.getItem("jwtToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl + 'registerShelter', {
      userID: localStorage.getItem("userID"),
      representativeEmailAddress: localStorage.getItem("userEmail"),
      shelterName: inputData.shelterName,
      representativeFacebookLink: inputData.shelterFacebookUrl,
      unitNoAndStreet: inputData.shelterNo,
      ward: inputData.shelterWard,
      district: inputData.shelterDistrict,
      city: inputData.shelterProvince,
      shelterPhoneNo: inputData.shelterPhoneNum,
      shelterLogo: "",
      relatedDocuments: relatedDoc

    }, { headers })
  }

  // getHeaders(): HttpHeaders {
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', 'Bearer ' + localStorage.getItem("jwtToken"));
  //   return headers;
  // }
}
