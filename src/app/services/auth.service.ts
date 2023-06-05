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
    console.log(inputData);
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
    return JSON.parse(localStorage.getItem('userRoles')).value
  }

  setToken(jwtToken: string) {
    console.log("set token gg ")
    this.setTimeResetToken("jwtToken", jwtToken)
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem("jwtToken")).value
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

  setTimeResetToken(key: string, value: any, expiryTime: number = 86400000) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiryTime
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    const parsedItem = JSON.parse(item);
    if (parsedItem.expiry < new Date().getTime()) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedItem.value;
  }

  clearExpiredItems() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      this.getItem(key);
    }
  }
  init() {
    setInterval(() => {
      this.clearExpiredItems();
    }, 1000 * 60 * 60 * 8);
  }
}
