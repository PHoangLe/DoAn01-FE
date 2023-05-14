import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
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
    private petAdopt: PetAdoptionService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getPageData()
  }

  async getPageData() {
    this.pet = await this.petService.getStoragePet();
    console.log(this.pet);
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);

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
    this.petAdopt.sendAdoptionRequest(this.pet.animalID, this.pet.shelterID, JSON.parse(localStorage.getItem("userID")).value).then(() => {
      this.messageService.add({ key: 'adoptPet', severity: 'info', summary: 'Gửi yêu cầu thành công!' })
    })
      .catch(error => {
        console.log(error.error.message);
        this.messageService.add({ key: 'adoptPet', severity: 'error', summary: 'Có lỗi xảy ra! Xin liên hệ trại nuôi để được hỗ trợ' })
      })
  }

}
