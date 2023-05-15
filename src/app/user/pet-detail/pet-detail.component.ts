import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { BankingComponent } from './banking/banking.component';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.less'],
  providers: [DialogService, MessageService]
})
export class PetDetailComponent implements OnInit, OnDestroy {
  protected pet: Pet
  protected breadcrumbItimes: MenuItem[];
  protected listImg = new Array<string>();
  protected responsiveOptions: any[];
  protected listUserImg = new Array<string>();
  private ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private petAdopt: PetAdoptionService,
    private messageService: MessageService,

    private dialogService: DialogService
  ) {
  }
  ngOnDestroy(): void {
    // if (this.ref) {
    //   this.ref.close();
    // }
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

  onlineAdopt() {
    this.ref = this.dialogService.open(BankingComponent, {
      data: this.pet,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })

    this.ref.onClose.subscribe((value) => {
      this.getPageData();
    });
  }

  onReject() {
    this.messageService.clear('confirmAdoption')
  }
  onConfirm() {
    this.petAdopt.sendAdoptionRequest(this.pet.animalID, this.pet.shelterID, JSON.parse(localStorage.getItem("userID")).value).then(value => {
      console.log(value);
      this.messageService.add({ key: 'adoptPet', severity: 'info', summary: 'Gửi yêu cầu thành công!' })
    })
      .catch(error => {
        console.log(error.error.message);
        this.messageService.add({ key: 'adoptPet', severity: 'error', summary: 'Có lỗi xảy ra! Xin liên hệ trại nuôi để được hỗ trợ' })
      })
    this.messageService.clear('confirmAdoption')

  }

}
