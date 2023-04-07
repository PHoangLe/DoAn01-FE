import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[]
  constructor(private router: Router) { }
  ngOnInit() {
    this.menuItems = [
      {
          // label: '',
          items: [
              {
                  label: 'Thông tin cá nhân',
                  icon: 'pi pi-user',
                  command: () => {
                  }
              },
              {
                  label: 'Đổi mật khẩu',
                  icon: 'pi pi-replay',
                  command: () => {
                  }
              },
              {
                label: 'Đăng xuất',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.signOut()
                }
            }
          ]
      }

  ];
  }

  loggedIn(): boolean{
    return localStorage.getItem("userID") !== null
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }


}
