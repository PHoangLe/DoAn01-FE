import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptService } from 'src/app/services/pet-adopt.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.less']
})
export class PetDetailComponent implements OnInit {

  protected pet: Pet
  protected breadcrumbItimes: MenuItem[];
  protected listImg
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetAdoptService) {
  }
  ngOnInit(): void {
    console.log(this.getPet(this.route.snapshot.paramMap.get('id')))
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ'
      },
      {
        label: 'Danh sách thú cưng'
      },
      {
        label: 'Chi tiết thú cưng'
      }
    ]
  }

  getPet(id: string) {
    this.petService.getPetById(id).subscribe(data => {
      console.log(data)
      this.pet = this.petService.convertToPet(data);
    })
  }
}
