import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';

const apiBaseUrl = "/api/v1/auth/authenticate"
const httpOptions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
};
// const httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/auth/authenticate";

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>(this.baseUrl);
  }

  logIn(inputdata: any): Observable<any>{
    return this.http.post(this.baseUrl, {
      userEmail: inputdata.userEmail,
      userPassword: inputdata.userPassword
    },httpOptions
    );
  }

  Login(inputdata: any){
    return this.http.post(this.baseUrl, inputdata)
  }
}
