import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Shelter } from 'src/app/model/Shelter';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-shelter-info',
  templateUrl: './shelter-info.component.html',
  styleUrls: ['./shelter-info.component.less']
})
export class ShelterInfoComponent implements OnInit {
  private shelterID: string;
  protected shelter: Shelter;
  protected shelterAddress: string;
  constructor(
    private shelterService: ShelterService,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig) {
    this.shelterID = this.config.data
  }
  ngOnInit(): void {
    this.getShelter();
  }

  async getShelter() {
    await this.shelterService.getShelterInfoByShelterID(this.shelterID).then((shelterInfo) => {
      this.shelter = this.shelterService.toShelter(shelterInfo)
    })
    console.log(this.shelter)
    this.shelterAddress = this.shelter.unitNoAndStreet + ", " + this.shelter.ward + ", " + this.shelter.district + ", " + this.shelter.city
  }
}
