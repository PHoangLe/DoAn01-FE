import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PetAdoptionService } from 'src/app/services/pet-adoption.service';

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.less']
})
export class AdoptionRequestComponent implements OnInit {
  breadcrumbItimes: MenuItem[]
  listRequest: any[]
  constructor(
    private petAdopt: PetAdoptionService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getAdoptionRequest()
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi'
      },
      {
        label: 'Yêu cầu nhận nuôi'
      }
    ]
  }


  async getAdoptionRequest() {
    await this.petAdopt.getAdoptionByShelter().then(adoption => {
      console.log(adoption)
      this.listRequest = adoption
    })
      .catch(error => {
        console.log(error.error.message)
      })
  }

  getSeverity(status: string) {
    switch (status) {
      case 'accept':
        return 'success';
      case 'pending':
        return 'info';
      default:
        return 'warning';
    }
  }

  onRowSelect(data) {
    console.log(data)
    this.petAdopt.setStorageAdoption(data)
    this.router.navigate([`adopt/adoption-detail/${data.application.applicationID}`])
  }
  customSort(event) {

  }
}

//
