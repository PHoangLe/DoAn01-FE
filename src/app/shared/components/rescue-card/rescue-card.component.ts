import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { RescueService } from 'src/app/services/rescue.service';

@Component({
  selector: 'app-rescue-card',
  templateUrl: './rescue-card.component.html',
  styleUrls: ['./rescue-card.component.less']
})
export class RescueCardComponent {

  @Input() pet: any;


  constructor(
    private router: Router,
    private rescueService: RescueService,
  ) { }

  ngOnInit() {
  }

  routeToRescueDetail() {
    this.rescueService.setStorageRescuePost(this.pet)
    this.router.navigate([`rescue/rescue-detail/${this.pet.rescuePostID}`])
  }

  getSeverity(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'WAITING':
        return 'info';
      case 'PROCESSING':
        return 'warning';
      default:
        return 'danger';
    }
  }

  getStatus(status: string) {
    switch (status) {
      case 'COMPLETED':
        return 'Giải cứu thành công bởi: ';
      case 'WAITING':
        return 'Đang chờ giải cứu';
      case 'PROCESSING':
        return 'Đang được giải cứu bởi: ';
      default:
        return 'Giải cứu không thành công';
    }
  }

}
