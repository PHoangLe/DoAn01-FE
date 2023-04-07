import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[]
  constructor() { }


  ngOnInit() {
    this.menuItems = [
      {
          label: 'Options',
          items: [
              {
                  label: 'Update',
                  icon: 'pi pi-refresh',
                  command: () => {
                  }
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-times',
                  command: () => {
                  }
              }
          ]
      },
      {
          label: 'Navigate',
          items: [
              {
                  label: 'Angular',
                  icon: 'pi pi-external-link',
                  url: 'http://angular.io'
              },
              {
                  label: 'Router',
                  icon: 'pi pi-upload',
                  routerLink: '/fileupload'
              }
          ]
      }
  ];
  }

  loggedIn(): boolean{
    return localStorage.getItem("userID") !== null
  }


}
