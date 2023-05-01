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
    let headers = this.getHttpHeader();
    return this.http.get(this.baseUrl + '/getAllAnimals', { headers })
  }

  getAllPetsByShelter() {

  }


  async addPet(petData: any, avatarUrl: string, otherImg: string[]): Promise<any> {
    const headers = this.getHttpHeader();
    const shelterID = await this.shelterService.getShelterByUserID();
    try {
      let response = await this.http.post(this.baseUrl + '/addAnimal', {
        "shelterID": shelterID,
        "animalName": petData.petName,
        "animalAge": petData.petAge,
        "animalGender": petData.petGender.id,
        "animalWeight": petData.petWeight,
        "animalBreed": petData.petBreed,
        "animalSpecie": petData.petSpecie.value,
        "animalColor": petData.petColor,
        "animalImg": avatarUrl,
        "animalStatus": petData.petDetails,
        "vaccinated": petData.vaccinated,
        "deWormed": petData.deWorm,
        "sterilized": petData.sterilized,
        "friendly": petData.friendly,
        "othersImg": otherImg
      }, { headers });
      return response;
    }
    catch (error) {
      console.log(error);
      throw error;
    }

  }

  convertToPets(input: any): Pet[] {
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


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
