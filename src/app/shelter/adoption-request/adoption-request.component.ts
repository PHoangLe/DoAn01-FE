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
  isLoading = true;
  listRequest: any[]
  constructor(
    private petAdopt: PetAdoptionService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getAdoptionRequest()
    this.breadcrumbItimes = [
      {
        label: 'Nhận nuôi',
        command: () => {
          this.router.navigate(['/shelter/adopt'])
        }
      },
      {
        label: 'Yêu cầu nhận nuôi'
      }
    ]
  }


  async getAdoptionRequest() {
    this.isLoading = true
    await this.petAdopt.getAdoptionByShelter().then(adoption => {
      this.listRequest = adoption;
      this.isLoading = false
    })
      .catch(error => {
        console.log(error.error.message)
      })
  }

  getSeverity(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'info';
      default:
        return 'danger';
    }
  }

  onRowSelect(data) {
    console.log(data)
    this.petAdopt.setStorageAdoption(data)
    this.router.navigate([`adopt/adoption-detail/${data.applicationID}`])
  }
  customSort(event) {

  }
}

//
