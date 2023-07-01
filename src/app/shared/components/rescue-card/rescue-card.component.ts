import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-rescue-card',
  templateUrl: './rescue-card.component.html',
  styleUrls: ['./rescue-card.component.less']
})
export class RescueCardComponent {

  @Input() pet: any;

  constructor(private router: Router, private petService: PetService, private authService: AuthService) { }

  ngOnInit() {
  }

  routeToRescueDetail(pet) {

  }
}
