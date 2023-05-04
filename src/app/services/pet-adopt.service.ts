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

  async getAllPetsByShelter() {
    let headers = this.getHttpHeader();
    let shelterID = await this.shelterService.getShelterIDByUserID();
    return this.http.get(this.baseUrl + `/getAnimalsByShelterID/${shelterID}`, { headers }).toPromise();
  }

  async getPetById(id: string) {
    const headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + `/getAnimalByAnimalID/${id}`, { headers }).toPromise();
  }


  async addPet(petData: any, avatarUrl: string, otherImg: string[]): Promise<any> {
    let headers = this.getHttpHeader();
    const shelterID = await this.shelterService.getShelterIDByUserID();
    try {
      let response = await this.http.post(this.baseUrl + '/addAnimal', {
        "shelterID": shelterID,
        "animalName": petData.petName,
        "animalAge": petData.petAge,
        "animalGender": petData.petGender.id ? true : false,
        "animalWeight": petData.petWeight,
        "animalBreed": petData.petBreed,
        "animalSpecie": petData.petSpecie.id,
        "animalColor": petData.petColor,
        "animalImg": avatarUrl,
        "animalStatus": petData.petDetails,
        "vaccinated": petData.vaccinated ? true : false,
        "deWormed": petData.deWorm ? true : false,
        "sterilized": petData.sterilized ? true : false,
        "friendly": petData.friendly ? true : false,
        "othersImg": otherImg
      }, { headers }).toPromise();
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
        item.animalName ? item.animalName : 'Chưa có tên',
        item.shelterID,
        item.animalAge,
        item.animalGender,
        item.animalWeight,
        item.animalBreed,
        item.animalSpecie,
        item.animalColor,
        item.animalImg ? item.animalImg : "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
        item.animalStatus,
        item.vaccinated,
        item.deWormed,
        item.sterilized,
        item.friendly,
        item.othersImg,
        item.onlineAdaptors,
        item.adopted)

      petList.push(pet)
    });
    return petList
  }

  convertToPet(data: any) {
    return new Pet(
      data.animalID,
      data.animalName,
      data.shelterID,
      data.animalAge,
      data.animalGender,
      data.animalWeight,
      data.animalBreed,
      data.animalSpecie,
      data.animalColor,
      data.animalImg ? data.animalImg : "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
      data.animalStatus,
      data.vaccinated,
      data.deWormed,
      data.sterilized,
      data.friendly,
      data.othersImg,
      data.onlineAdaptors,
      data.adopted
    )
  }


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwtToken")).value}`,
    });
  }

}
