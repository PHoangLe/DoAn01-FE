import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterService } from './shelter.service';
import { Pet } from '../model/Pet';

@Injectable({
  providedIn: 'root'
})
export class PetAdoptService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/animal";
  constructor(private http: HttpClient, private shelterService: ShelterService) { }

  getAllPets() {
    const token = JSON.parse(localStorage.getItem("jwtToken")).value;
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(this.baseUrl + '/getAllAnimals', { headers })
  }

  convertToPets(input : any) : Pet[]{
    var petList = new Array<Pet>
    input.forEach(item => {
      const pet = new Pet(
        item.animalID,
        item.animalName,
        item.shelterID,
        item.animalAge,
        item.animalGender,
        item.animalWeight,
        item.animalBreed,
        item.animalSpecie,
        item.animalColor,
        item.animalImg,
        item.animalStatus,
        item.vaccinated,
        item.deWormed,
        item.sterilized,
        item.friendly,
        item.othersImg)

        petList.push(pet)
      });
    return petList
  }

}
