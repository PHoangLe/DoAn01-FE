import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';

@Component({
  selector: 'app-adoption-detail',
  templateUrl: './adoption-detail.component.html',
  styleUrls: ['./adoption-detail.component.less']
})
export class AdoptionDetailComponent implements OnInit {
  requestInfo: any;
  breadcrumbItimes: MenuItem[];
  ngOnInit(): void {
    this.getPageData();
  }

  constructor(
    private messageService: MessageService,
    private petAdoptionService: PetAdoptionService) {

  }

  async getPageData() {
    this.requestInfo = await this.petAdoptionService.getStorageAdoption();
    console.log(this.requestInfo)
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi'
      },
      {
        label: 'Yêu cầu nhận nuôi'
      },
      {
        label: this.requestInfo.animal.animalName
      }
    ]
  }

  acceptRequest() {
    this.petAdoptionService.acceptAdoption(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "messageService", severity: 'success', detail: 'Chấp nhận yêu cầu' })
    })
  }

  rejectRequest() {
    this.petAdoptionService.declineAdoption(this.requestInfo.applicationID).then((response) => {
      console.log(response)
      this.messageService.add({ key: "messageService", severity: 'warning', detail: 'Từ chối yêu cầu' })
    })
  }

  contactRequestor() {

  }

}
