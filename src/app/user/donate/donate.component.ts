import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.less']
})
export class DonateComponent {
  constructor(private router: Router) {

  }

  protected breadcrumbItimes = [
    {
      label: 'Trang chủ',
      command: () => {
        this.router.navigate(['user/landing'])
      }
    },
    {
      label: 'Danh sách quỹ cứu trợ',
    }

  ];

}
