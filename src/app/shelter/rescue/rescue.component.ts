import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ApiAddressService } from 'src/app/services/api-address.service';
import { RescueService } from 'src/app/services/rescue.service';
import { AddRescueComponent } from 'src/app/user/rescue/add-rescue/add-rescue.component';
import { ChatComponent } from '../chat/chat.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.less'],
  providers: [DialogService, MessageService, ChatComponent]

})
export class RescueComponent {
  protected rescuePet;
  protected processingRescue;
  private apiRes;
  protected listProvince = new Array;
  protected listDistrict = new Array;
  protected listWard = new Array;
  protected selectedProvince;
  protected selectedDistrict;
  protected selectedWard;
  protected listPost;
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
    private location: Location,
    private apiAddress: ApiAddressService,
    private chat: ChatComponent,
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
    await this.rescueService.getAllRescueByShelter().then(response => {
      this.apiRes = response
      this.rescuePet = this.apiRes[0]
      this.listPost = this.apiRes[0]
      this.processingRescue = this.apiRes[1]
      console.log(this.processingRescue)
      this.defaultRescuePets = [...this.rescuePet]
    }).catch(err => {
      err => {
        console.log(err.error.message)
      }
    })
    this.isLoading = false
  }


  routeToRescueDetail(rescue) {
    this.rescueService.setStorageRescuePost(rescue)
    this.router.navigate([`shelter/rescue-detail/${rescue.rescuePostID}`])
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

  onRefreshFilter() {
    this.rescuePet = [...this.listPost]
    this.searchValue = null;
    this.selectedProvince = null;
    this.selectedDistrict = null;
    this.selectedWard = null;
    this.listDistrict = null;
    this.listWard = null;
  }

  onUserSearched() {
    this.rescuePet = [...this.defaultRescuePets]
    if (this.searchValue === "")
      return
    const formatedValue = this.searchValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    console.log(formatedValue)
    this.rescuePet = this.rescuePet.filter((pet) => {
      return Object.values(pet).some(value =>
        String(value)
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(formatedValue)
      )
    })
  }

  public removePostFromList(postID: string) {
    this.rescuePet = this.rescuePet.filter((post) => {
      return post.rescuePostID !== postID
    })
    const post = this.rescuePet.find((post) => post.rescuePostID !== postID)
    this.processingRescue.push(post)
  }

  contactSender(senderID: string) {
    sessionStorage.setItem("reciepientID", senderID)
    this.chat.connect();
    setTimeout(() => {
      this.chat.setReceipientID(senderID);
      this.chat.sendValue("Bắt đầu trò chuyện")
      this.router.navigate(['/chat']);
    }, 1000);
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
