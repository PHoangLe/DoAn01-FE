import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Token } from '@angular/compiler';

const apiBaseUrl = "/api/v1/auth/authenticate"
const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json'})
};
// const httpOptions = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/";
  private userEmail: string;

  constructor(private http: HttpClient) { }

  logIn(inputData: any): Observable<any>{
    return this.http.post(this.baseUrl + 'auth/authenticate', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword
    },httpOptions
    );
  }

  registerNewUser(inputData: any): Observable<any>{
    return this.http.post(this.baseUrl + 'auth/userRegister', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userName),
      userLastName: this.getLastName(inputData.userName),
      userAvatar: ""
    }, httpOptions
    );
  }

  sendOTPVerifyEmail(inputData: any): Observable<any>{
    return this.http.post(this.baseUrl + 'otp/sendOTPConfirmEmail', {
      emailAddress: inputData.userEmail,
    },httpOptions
    );
  }
  verifyEmail(inputData: any): Observable<any>{
    console.log(this.userEmail)
    return this.http.post(this.baseUrl + 'otp/validateOTPConfirmEmail', {
      emailAddress: this.userEmail,
      otp: inputData.otp
    },httpOptions
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

  setUserEmail(email: any){
    this.userEmail = email
  }

  getUserEmail(){
    return this.userEmail
  }

  setRoles(userRoles :[]){
    localStorage.setItem("userRoles", JSON.stringify(userRoles))
  }
  getRoles(): []{
    return JSON.parse(localStorage.getItem('userRoles') || '{}')
  }

  setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken)
  }

  getToken(): string | null{
    return localStorage.getItem('jwtToken')
  }

  clear(){
    localStorage.clear();
  }

  isLoggedIn(){
    return this.getRoles() && this.getToken()
  }

  roleMatch(allowedRoles: any): boolean {
    let isMatch = false
    const userRoles: any = this.getRoles();
    console.log("current userRoles: " + userRoles)
    if(userRoles != null && userRoles){
      for(let i = 0; i < userRoles.length; i ++){
        for(let j = 0; j < allowedRoles.length; j++){
          if(userRoles[i] === allowedRoles[j]){
            isMatch = true;
            return isMatch
          }
          else{
            return isMatch
          }
        }
      }
    }
    return isMatch
  }
}
