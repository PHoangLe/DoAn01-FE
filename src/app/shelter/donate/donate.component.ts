import { Component } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.less']
})
export class DonateComponent {
  protected breadcrumbItimes = [
    {
      label: 'Trang chủ'
    },
    {
      label: 'Danh sách quỹ cứu trợ',

    }

  ];
}
