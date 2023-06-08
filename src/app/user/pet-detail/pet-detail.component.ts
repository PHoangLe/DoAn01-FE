import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { BankingComponent } from './banking/banking.component';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.less'],
  providers: [DialogService, MessageService]
})
export class PetDetailComponent implements OnInit, OnDestroy {
  protected pet: Pet
  protected shelterName: string;
  protected isLoading = true;
  protected adoption: any;
  protected petShelterName: string
  protected breadcrumbItimes: MenuItem[];
  protected listImg = new Array<string>();
  protected responsiveOptions: any[];
  protected listUserImg = new Array<string>();
  protected isSendOnlAdoption = false;
  protected isSendAdoption = false;

  private userID: string;
  private ref: DynamicDialogRef;

  constructor(
    private shelterSerivce: ShelterService,
    private petService: PetService,
    private petAdopt: PetAdoptionService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }


  ngOnInit(): void {
    this.getPageData()
  }

  async getPageData() {
    this.isLoading = true;
    this.pet = await this.petService.getStoragePet();
    this.shelterName = await this.shelterSerivce.getShelterByShelterID(this.pet.shelterID)
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);
    this.userID = JSON.parse(localStorage.getItem('userID')).value;
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
        label: 'Danh sách thú cưng',
        command: () => {
          this.router.navigate(['/user/adopt']);
        }
      },
      {
        label: `${this.pet.animalName}`
      }
    ]

    await this.petAdopt.isAdoptedPet(this.pet.animalID, this.userID).then(response => {
      this.isSendAdoption = true;
    })
      .catch(error => {
        this.isSendAdoption = false;
      })

    await this.petAdopt.isOnlineAdoptedPet(this.pet.animalID, this.userID).then(response => {
      this.isSendOnlAdoption = true;
    })
      .catch(error => {
        this.isSendOnlAdoption = false;
      })
    this.isLoading = false;

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
    this.petAdopt.sendOnlineAdoptionRequest(this.pet.animalID, this.pet.shelterID, this.userID).then(() => {
      this.messageService.add({ key: 'adoptPet', severity: 'success', summary: 'Đã gửi yêu cầu!' })
      this.isSendOnlAdoption = true;
      setTimeout(() => {
        this.ref = this.dialogService.open(BankingComponent, {
          data: this.pet,
          width: '50%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: false,
          header: 'Ví điện tử MOMO'
        })
      }, 1500);
    })
  }

  onReject() {
    this.messageService.clear('confirmAdoption')
  }
  onConfirm() {
    this.petAdopt.sendAdoptionRequest(this.pet.animalID, this.pet.shelterID, JSON.parse(localStorage.getItem("userID")).value).then(value => {
      console.log(value);
      this.isSendAdoption = true;
      this.messageService.add({ key: 'adoptPet', severity: 'info', summary: 'Gửi yêu cầu thành công!' })
    })
      .catch(error => {
        console.log(error.error.message);
        this.messageService.add({ key: 'adoptPet', severity: 'error', summary: 'Có lỗi xảy ra! Xin liên hệ trại nuôi để được hỗ trợ' })
      })
    this.messageService.clear('confirmAdoption')

  }

}
