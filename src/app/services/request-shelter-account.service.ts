import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UploadFileService } from './upload-file.service';
import { AuthService } from './auth.service';


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

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendRequest(inputData: any, relatedDoc: string[], logo: string): Observable<any> {
    const token = this.authService.getDataFromCookie("jwtToken");
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl + 'registerShelter', {
      userID: this.authService.getDataFromCookie("userID"),
      representativeEmailAddress: this.authService.getDataFromCookie("userEmail"),
      shelterName: inputData.shelterName,
      representativeFacebookLink: inputData.shelterFacebookUrl,
      unitNoAndStreet: inputData.shelterNo,
      ward: inputData.shelterWard,
      district: inputData.shelterDistrict,
      city: inputData.shelterProvince,
      shelterPhoneNo: inputData.shelterPhoneNum,
      shelterLogo: logo ? logo : 'https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Logo%2Fonly_logo.png?alt=media&token=9eb9163b-90d1-4ae6-9e93-d18b71b959b8',
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
