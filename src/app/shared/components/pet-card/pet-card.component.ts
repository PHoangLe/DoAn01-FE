import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from 'src/app/model/Pet';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.less']
})
export class PetCardComponent implements OnInit {
  @Input() pet: any;

  constructor(private router: Router, private petService: PetService, private authService: AuthService) { }

  ngOnInit() {
  }

  routeToPetDetail(pet: Pet) {
    this.petService.setStoragePet(pet);
    if (this.authService.getDataFromCookie("userRoles")) {
      if (this.authService.getDataFromCookie("userRoles").includes("ROLE_SHELTER_MANAGER"))
        this.router.navigate([`/shelter/pet-detail/${pet.animalID}`])

    }
    else {
      this.router.navigate([`/user/pet-detail/${pet.animalID}`])

    }

  }

}
