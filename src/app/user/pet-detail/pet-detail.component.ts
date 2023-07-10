import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { BankingComponent } from './banking/banking.component';
import { ShelterService } from 'src/app/services/shelter.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.less'],
  providers: [DialogService, MessageService]
})
export class PetDetailComponent implements OnInit {
  protected pet: Pet
  protected shelterName: string;
  protected isLoading = true;
  protected adoption: any;
  protected petShelterName: string
  protected breadcrumbItimes: MenuItem[];
  protected listImg = new Array<string>();
  protected responsiveOptions: any[];
  protected listOnlineAdopter;
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
    private router: Router,
    private authService: AuthService
  ) {
    this.breadcrumbItimes = [
      {
        label: 'Danh sách thú cưng',
        command: () => {
          this.router.navigate(['/user/adopt']);
        }
      }
    ]
  }
  ngOnInit(): void {
    this.getPageData()
  }

  async getPageData() {
    this.isLoading = true;
    this.pet = this.petService.getStoragePet();
    this.shelterName = await this.shelterSerivce.getShelterByShelterID(this.pet.shelterID)
    this.userID = this.authService.getDataFromCookie("userID");;
    this.listImg.push(this.pet.animalImg);
    if (this.pet.othersImg)
      this.listImg.push(...this.pet.othersImg);
    this.petService.getOnlineAdopters(this.pet.animalID).then((adopters) => {
      this.listOnlineAdopter = adopters;
    })
      .catch(error => {
        console.log(error);
      })

    await this.petAdopt.isAdoptedPet(this.pet.animalID, this.userID).then(response => {
      this.adoption = response;
      if (this.adoption.applicationStatus === "REJECTED")
        this.isSendAdoption = false;
      else
        this.isSendAdoption = true;
    })
      .catch(error => {
        this.isSendAdoption = false;
      })

    await this.petAdopt.isOnlineAdoptedPet(this.pet.animalID, this.userID).then(response => {
      this.adoption = response;
      if (this.adoption.applicationStatus === "REJECTED")
        this.isSendOnlAdoption = false;
      else
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
        this.openBankingComponent();

      }, 1500);
    })
  }

  openBankingComponent() {
    this.ref = this.dialogService.open(BankingComponent, {
      data: this.pet,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      header: 'Ví điện tử MOMO'
    });
  }

  onReject() {
    this.messageService.clear('confirmAdoption')
  }
  onConfirm() {
    this.petAdopt.sendAdoptionRequest(this.pet.animalID, this.pet.shelterID, this.authService.getDataFromCookie("userID")).then(value => {
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
