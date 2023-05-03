import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.less']
})
export class PetCardComponent implements OnInit {
  @Input() pet: any;

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  routeToPetDetail(petID: string) {
    this.router.navigate([`/shelter/pet-detail/${petID}`])
  }

}
