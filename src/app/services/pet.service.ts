import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterService } from './shelter.service';
import { Pet } from '../model/Pet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = "https://doan01-be-production.up.railway.app/api/v1/animal";
  pet: Pet;
  constructor(private http: HttpClient, private shelterService: ShelterService, private authService: AuthService) { }

  async getAllPets() {
    return await this.http.get(this.baseUrl + '/getAllAnimals').toPromise();
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

  async getOnlineAdopters(id: string) {
    const headers = this.getHttpHeader();
    return await this.http.get(this.baseUrl + `/getOnlineAdoptersByAnimalID/${id}`, { headers }).toPromise();
  }


  async addPet(petData: any, avatarUrl: string, otherImgUrl: string[]): Promise<any> {
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
        "othersImg": otherImgUrl
      }, { headers }).toPromise();
      return response;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePet(petId: string) {
    let headers = this.getHttpHeader()
    return await this.http.delete(this.baseUrl + `/deleteAnimal/${petId}`, { headers }).toPromise();
  }

  async updatePet(petData: any, avatarUrl: string, otherImgUrl: string[]) {
    let headers = this.getHttpHeader();
    return await this.http.put(this.baseUrl + '/updateAnimal', {
      "animalID": petData.animalID,
      "shelterID": petData.shelterID,
      "animalName": petData.animalName,
      "animalAge": petData.animalAge,
      "animalGender": petData.animalGender,
      "animalWeight": petData.animalWeight,
      "animalBreed": petData.animalBreed,
      "animalSpecie": petData.animalSpecie,
      "animalColor": petData.animalColor,
      "animalImg": avatarUrl,
      "animalStatus": petData.animalStatus,
      "vaccinated": petData.vaccinated ? true : false,
      "deWormed": petData.deWorm ? true : false,
      "sterilized": petData.sterilized ? true : false,
      "friendly": petData.friendly ? true : false,
      "othersImg": otherImgUrl
    }, { headers }).toPromise();
  }

  setPet(pet: Pet) {
    this.pet = pet;
  }

  setStoragePet(pet: Pet) {
    sessionStorage.setItem("currentPet", JSON.stringify(pet));
  }

  getPet() {
    return this.pet;
  }
  getStoragePet(): Pet {
    const petJson = sessionStorage.getItem("currentPet");
    if (!petJson) {
      return null;
    }
    return new Pet(
      JSON.parse(petJson)._animalID,
      JSON.parse(petJson)._animalName,
      JSON.parse(petJson)._shelterID,
      JSON.parse(petJson)._animalAge,
      JSON.parse(petJson)._animalGender,
      JSON.parse(petJson)._animalWeight,
      JSON.parse(petJson)._animalBreed,
      JSON.parse(petJson)._animalSpecie,
      JSON.parse(petJson)._animalColor,
      JSON.parse(petJson)._animalImg ? JSON.parse(petJson)._animalImg : "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0",
      JSON.parse(petJson)._animalStatus,
      JSON.parse(petJson)._vaccinated,
      JSON.parse(petJson)._deWormed,
      JSON.parse(petJson)._sterilized,
      JSON.parse(petJson)._friendly,
      JSON.parse(petJson)._othersImg,
      JSON.parse(petJson)._adopted,
      JSON.parse(petJson)._isDelete,
    )
  }

  getStorageAdoption() {
    const adoptionJSON = sessionStorage.getItem("currentAdoption");
    if (!adoptionJSON) {
      return null;
    }
  }

  convertToPets(input: any): Pet[] {
    var petList = new Array<Pet>
    if (input) {
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
          item.adopted,
          item.isDelete,
        )

        petList.push(pet)
      });
    }

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
      data.adopted,
      data.isDelete
    )
  }


  getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getDataFromCookie("jwtToken")}`,
    });
  }

}
