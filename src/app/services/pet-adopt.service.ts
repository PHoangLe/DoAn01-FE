import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterService } from './shelter.service';

@Injectable({
  providedIn: 'root'
})
export class PetAdoptService {

constructor(private http: HttpClient, private shelterService : ShelterService) { }
}
