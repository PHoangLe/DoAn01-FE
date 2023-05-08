import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
  protected listOnlineAdoptor = new Array<string>();

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.getPageData()

  }

  async getPageData() {
    this.pet = await this.petService.getStoragePet();
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);
    this.listOnlineAdoptor.push(...this.pet.onlineAdaptors)
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi'
      },
      {
        label: 'Danh sách thú cưng'
      },
      {
        label: this.pet.animalName
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

  deletePet() {
    this.confirmationService.confirm({
      message: `Bạn có chắc muốn xoá ${this.pet.animalName}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.petService.deletePet(this.pet.animalID).then(() => {
          this.messageService.add({ key: 'deletePet', severity: 'success', summary: 'Xoá thành công' });
        }).catch(error => {
          this.messageService.add({ key: 'deletePet', severity: 'error', summary: error.error.message });
        })
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    })
    this.router.navigate(['/shelter/adopt']);
  }
}
