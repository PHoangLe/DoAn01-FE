import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { Token } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/";
  private userEmail: string;

  constructor(private http: HttpClient) { }

  logIn(inputData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/authenticate', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword
    }, httpOptions
    );
  }

  registerNewUser(inputData: any): Observable<any> {
    this.setUserEmail(inputData.userEmail)
    return this.http.post(this.baseUrl + 'auth/userRegister', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userName),
      userLastName: this.getLastName(inputData.userName),
      userAvatar: ""
    }, httpOptions
    );
  }

  sendOTPVerifyEmail(inputData: any): Observable<any> {
    console.log("type of sent email: " + typeof inputData)
    console.log("sent email: " + inputData)
    return this.http.post(this.baseUrl + 'otp/sendOTPConfirmEmail', {
      emailAddress: inputData,
    }, httpOptions
    );
  }
  verifyEmail(inputData: any): Observable<any> {
    console.log(this.userEmail)
    return this.http.post(this.baseUrl + 'otp/validateOTPConfirmEmail', {
      emailAddress: this.userEmail,
      otp: inputData.otp
    }, httpOptions
    );
  }

  loginGoogle(inputData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/googleUserAuthenticate', {
      userEmail: inputData.email,
      userFirstName: inputData.firstName,
      userLastName: inputData.lastName,
      userAvatar: inputData.photoUrl
    }, httpOptions
    );
  }

  getFirstName(userName: string) {
    return userName.slice(0, userName.indexOf(" "))
  }
  getLastName(userName: string) {
    return userName.slice((userName.trim().indexOf(" ") + 1))
  }

  setUserEmail(email: any) {
    this.userEmail = email
  }

  getUserEmail() {
    return this.userEmail
  }

  setRoles(userRoles: []) {
    localStorage.setItem("userRoles", JSON.stringify(userRoles))
  }
  getRoles(): [] {
    return JSON.parse(localStorage.getItem('userRoles') || '{}')
  }

  setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken)
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken')
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn() {
    return this.getRoles() && this.getToken()
  }

  roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.getRoles();
    if (userRoles != null && userRoles)
      if (userRoles.includes(allowedRoles[0]))
        return true
    return false
  }
}
