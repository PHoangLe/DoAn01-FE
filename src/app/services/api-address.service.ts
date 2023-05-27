import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAddressService {
  private baseUrl = "https://vn-public-apis.fpo.vn/"

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any> {
    return this.http.get(this.baseUrl + "provinces/getAll?limit=-1", {
    }
    );
  }


  getDisctrictsByProvince(provinceCode: string): Observable<any> {
    return this.http.get(this.baseUrl + `districts/getByProvince?provinceCode=${provinceCode}&limit=-1`, {
    }
    );
  }


  getWardsByDistrict(districtCode: string): Observable<any> {
    return this.http.get(this.baseUrl + `wards/getByDistrict?districtCode=${districtCode}&limit=-1`, {
    }
    );
  }

}
