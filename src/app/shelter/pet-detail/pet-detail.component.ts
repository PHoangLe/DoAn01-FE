import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/services/pet.service';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { ShelterService } from 'src/app/services/shelter.service';
import { User } from 'src/app/model/User';

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
  protected listOnlineAdopter = new Array<any>();
  private ref: DynamicDialogRef;
  constructor(
    private shelterService: ShelterService,
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dialogService: DialogService) {
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  async ngOnInit() {
    await this.getPageData()
  }

  async getPageData() {
    this.pet = await this.petService.getStoragePet();
    this.breadcrumbItimes = [
      {
        label: 'Danh sách thú cưng',
        command: () => {
          this.router.navigate(['/shelter/adopt'])
        }
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
    this.listImg.push(this.pet.animalImg);
    this.listImg.push(...this.pet.othersImg);
    if (this.pet.onlineAdopters)
      this.listOnlineAdopter.push(...this.pet.onlineAdopters)
    console.log(this.listOnlineAdopter)


  }

  editPet() {
    this.ref = this.dialogService.open(EditPetComponent, {
      data: this.pet,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })
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
