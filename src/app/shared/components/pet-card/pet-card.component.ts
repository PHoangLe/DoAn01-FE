import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.less']
})
export class PetCardComponent implements OnInit {
  @Input() pet: any;

  constructor() { }

  ngOnInit() {
  }

}
