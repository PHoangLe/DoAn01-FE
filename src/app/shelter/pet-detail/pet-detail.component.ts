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
export class PetDetailComponent implements OnInit {

  protected pet: Pet
  protected breadcrumbItimes: MenuItem[];
  protected listImg = new Array<string>();
  protected responsiveOptions: any[];
  protected listUserImg = new Array<string>();
  protected listOnlineAdopter;
  private ref: DynamicDialogRef;
  constructor(
    private shelterService: ShelterService,
    private petService: PetService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dialogService: DialogService) {
    this.breadcrumbItimes = [
      {
        label: 'Danh sách thú cưng',
        command: () => {
          this.router.navigate(['/shelter/adopt'])
        }
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
  async ngOnInit() {
    await this.getPageData()
  }

  async getPageData() {
    this.pet = await this.petService.getStoragePet();

    this.listImg.push(this.pet.animalImg);
    if (this.pet.othersImg)
      this.listImg.push(...this.pet.othersImg);
    this.petService.getOnlineAdopters(this.pet.animalID).then((adopters) => {
      this.listOnlineAdopter = adopters;
    })
      .catch(error => {
        console.log(error);
      })
  }

  editPet() {
    const petTemp = this.petService.convertToPet(this.pet);
    this.ref = this.dialogService.open(EditPetComponent, {
      data: petTemp,
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
      accept: async () => {
        await this.petService.deletePet(this.pet.animalID).then(() => {
          this.messageService.add({ key: 'deletePet', severity: 'success', summary: 'Xoá thành công' });
        }).catch(error => {
          this.messageService.add({ key: 'deletePet', severity: 'error', summary: error.error.message });
        })
        setTimeout(() => {
          this.router.navigate(['/shelter/adopt']);
        }, 1000);

      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Bạn đã từ chối' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Bạn đã từ chối' });
            break;
        }
      }
    })
  }

  public reloadPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`shelter/pet-detail/${this.pet.animalID}`]);
    });
  }
}
