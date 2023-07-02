import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Shelter } from 'src/app/model/Shelter';
import { ShelterService } from 'src/app/services/shelter.service';
import { Router } from '@angular/router';
import { RescueService } from 'src/app/services/rescue.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRescueComponent } from './add-rescue/add-rescue.component';
import { ApiAddressService } from 'src/app/services/api-address.service';


@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.less'],
  providers: [DialogService, MessageService]
})
export class RescueComponent implements OnInit {
  protected rescuePet;
  listProvince = new Array;
  listDistrict = new Array;
  listWard = new Array;

  protected isLoading = true;
  protected defaultRescuePets;
  protected selectedStatus: string;
  protected sortField = '';
  protected searchValue;
  protected rescueStatus = [
    { id: "All", value: "Tất cả" },
    { id: "WAITING", value: "Đang chờ" },
    { id: "PROCESSING", value: "Đang giải cứu" },
    { id: "COMPLETED", value: "Giải cứu thành công" },
    { id: "ABORTED", value: "Giải cứu không thành công" },

  ]
  protected breadcrumbItimes: MenuItem[];
  ref: DynamicDialogRef;
  constructor(
    private rescueService: RescueService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private apiAddress: ApiAddressService,

    private router: Router) {
  }

  ngOnInit(): void {

    this.getAllRescuePost();
    this.bindProvinces();
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ',
        command: () => {
          this.router.navigate(['/user/landing'])
        }
      },
      {
        label: 'Danh sách cứu hộ',
      }
    ]
  }


  async getAllRescuePost() {
    this.isLoading = true
    await this.rescueService.getAllRescuePosts().then(response => {
      this.rescuePet = response
      this.defaultRescuePets = [...this.rescuePet]
    }).catch(err => {
      err => {
        console.log(err.error.message)
      }
    })
    this.isLoading = false
    console.log(this.rescuePet)
  }

  addNewPost() {
    this.ref = this.dialogService.open(AddRescueComponent, {
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })
  }

  public reloadPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user/rescue']);
    });
  }

  onCheckboxStatusChange(event) {
    this.rescuePet = [...this.defaultRescuePets]
    if (event.value === "All") {
      return
    }
    this.rescuePet = this.rescuePet.filter(pet => pet.status === this.selectedStatus)
  }

  onUserSearched() {
    if (this.searchValue === "")
      this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter((pet) => {
      return Object.values(pet).some((value) => String(value).includes(this.searchValue))
    })
  }

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvince = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    let foundProvince = this.listProvince.find(item => item.provName == selectedValue.provName);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrict = rListDistrict.map(rListDistrict => {
        return {
          distName: rListDistrict.name_with_type,
          distCode: rListDistrict.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.city === selectedValue.provName)

  }

  districtSelectedChange(selectedValue) {
    this.apiAddress.getWardsByDistrict(selectedValue.distCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => {
        return {
          wardName: rListWard.name_with_type,
          wardCode: rListWard.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.district === selectedValue.distName)
  }

  wardSelectedChange(selectedValue) {
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.ward === selectedValue.wardName)
  }
}
