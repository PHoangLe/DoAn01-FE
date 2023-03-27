import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';

const apiBaseUrl = "/api/v1/auth/authenticate"
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
// const httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/auth/";

  constructor(private http: HttpClient) { }

  logIn(inputData: any): Observable<any>{
    return this.http.post(this.baseUrl + 'authenticate', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword
    },httpOptions
    );
  }

  registerNewUser(inputData: any): Observable<any>{
    return this.http.post(this.baseUrl + 'userRegister', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userName),
      userLastName: this.getLastName(inputData.userName),
      userAvatar: ""
    }, httpOptions
    );
  }

  getFirstName(userName: string){
    // console.log(userName.split(" ", 1)[0].trim());
    return userName.split(" ", 1)[0].trim()
  }
  getLastName(userName: string){
    // console.log(userName.slice((userName.trim().indexOf(" ") + 1)));
    return userName.slice((userName.trim().indexOf(" ") + 1))
  }


}
