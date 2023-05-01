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
    let headers = this.getHttpHeader();
    const shelterID = await this.shelterService.getShelterByUserID();
    console.log("shelterID ", shelterID)
    console.log("animalName ", petData.petName)
    console.log("animalAge ", petData.petAge)
    console.log("animalGender ", petData.petGender.id)
    console.log("animalWeight ", petData.petWeight)
    console.log("animalBreed ", petData.petBreed)
    console.log("animalSpecie ", petData.petSpecie.value)
    console.log("animalColor ", petData.petColor)
    console.log("animalImg ", avatarUrl)
    console.log("animalStatus ", petData.petDetails)
    console.log("vaccinated ", petData.vaccinated ? true : false)
    console.log("deWormed ", petData.deWorm ? true : false)
    console.log("sterilized ", petData.sterilized ? true : false)
    console.log("friendly ", petData.friendly ? true : false)
    console.log("othersImg ", otherImg)
    try {
      const response = await this.http.post(this.baseUrl + '/addAnimal', {
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
        item.animalName,
        item.shelterID,
        item.animalAge,
        item.animalGender,
        item.animalWeight,
        item.animalBreed,
        item.animalSpecie,
        item.animalColor,
        item.animalImg == "" ? "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pet_pfp.png?alt=media&token=3fcf7cb9-a92b-402e-bc2c-08d632d62ae0" : item.animalImg,
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
