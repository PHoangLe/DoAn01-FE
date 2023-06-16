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

  async logIn(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'auth/authenticate', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword
    }, httpOptions
    )).toPromise();
  }

  async registerNewUser(inputData: any): Promise<any> {
    this.setUserEmail(inputData.userEmail)
    return await (this.http.post(this.baseUrl + 'auth/userRegister', {
      userEmail: inputData.userEmail,
      userPassword: inputData.userPassword,
      userFirstName: this.getFirstName(inputData.userName),
      userLastName: this.getLastName(inputData.userName),
      phoneNo: inputData.phoneNumber,
      userGender: "MALE",
      userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA."
    }, httpOptions
    )).toPromise();
  }

  async sendOTPVerifyEmail(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'otp/sendOTPConfirmEmail', {
      emailAddress: inputData,
    }, httpOptions
    )).toPromise();
  }
  async verifyEmail(inputData: any): Promise<any> {
    return await (this.http.post(this.baseUrl + 'otp/validateOTPConfirmEmail', {
      emailAddress: this.userEmail,
      otp: inputData.otp
    }, httpOptions
    )).toPromise();
  }

  loginGoogle(inputData: any) {
    return (this.http.post(this.baseUrl + 'auth/authenticateGoogleUser', {
      userEmail: inputData.email,
      userFirstName: inputData.firstName,
      userLastName: inputData.lastName,
      userAvatar: inputData.photoUrl
    }, httpOptions));

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
    this.setTimeResetToken("userRoles", JSON.stringify(userRoles))
  }
  getRoles(): [] {
    return this.getDataFromCookie("userRoles")
  }

  setToken(jwtToken: string) {
    console.log("set token gg ")
    this.setTimeResetToken("jwtToken", jwtToken)
  }

  getToken(): string {
    return this.getDataFromCookie("jwtToken")
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

  setTimeResetToken(key: string, value: any, expDays: number = 1) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = key + "=" + value + "; " + expires + "; path=/";
  }

  getDataFromCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
  }

}
