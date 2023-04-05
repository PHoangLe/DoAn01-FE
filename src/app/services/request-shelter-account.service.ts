import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from './upload-file.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RequestShelterAccountService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/shelter/";

  constructor(private http: HttpClient) { }

  sendRequest(inputData : any):  Observable<any> {
    return this.http.post(this.baseUrl + 'registerShelter', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword
    }, httpOptions
    );
  }
}
