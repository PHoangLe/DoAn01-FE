import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
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
  protected listImg = new Array<string>();
  protected responsiveOptions: any[];
  protected listUserImg = new Array<string>();
  protected listOnlineAdoptor = new Array<string>();

  constructor(
    private route: ActivatedRoute,
    private petService: PetAdoptService,
    private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.getPet(this.route.snapshot.paramMap.get('id'))
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi'
      },
      {
        label: 'Danh sách thú cưng'
      },
      {
        label: 'Chi tiết thú cưng'
      }
    ]
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  async getPet(id: string) {
    await this.petService.getPetById(id).then(data => {
      console.log(data)
      this.pet = this.petService.convertToPet(data);
    })
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);
    this.listOnlineAdoptor.push(...this.pet.onlineAdaptors)
  }

  deletePet() {
    this.messageService.add({ key: 'hidePet', severity: 'success', summary: 'Xoá thành công' });
  }
}
