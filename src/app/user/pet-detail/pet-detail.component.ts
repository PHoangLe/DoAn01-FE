import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/services/pet.service';

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

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.getPet(this.route.snapshot.paramMap.get('id'))

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
      this.pet = this.petService.convertToPet(data);
    })
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi'
      },
      {
        label: 'Danh sách thú cưng'
      },
      {
        label: `${this.pet.animalName}`
      }
    ]
  }

  requestAdoption() {
    this.messageService.add({
      key: 'confirmAdoption',
      severity: 'info',
      summary: 'Sticky',
      detail: 'Message Content',
      sticky: true,
    });
  }

  onReject() {

  }
  onConfirm() {

  }

}
