import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/statistic/";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getLandingStatistic() {
    return this.http.get(this.baseUrl + 'landing-page').toPromise();
  }
}
