import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  imageUrl: string
  menuItems: MenuItem[]
  userRole: string
  isLoggin = false;
  isShelter: false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    fileUploadService: UploadFileService) {
    try {
      if (JSON.parse(localStorage.getItem("userID")).value) {
        fileUploadService.getAvatarImageUrl(JSON.parse(localStorage.getItem("userID")).value).subscribe(url => {
          this.imageUrl = url;
        },
          error => {
            fileUploadService.getDefaultUserAvatar().subscribe(url => {
              this.imageUrl = url;
            }
            )
          },
        );
        this.isLoggin = true
      }
    }
    catch {
      console.log("There are no user")
    }
    if (this.isLoggin)
      this.isShelter = JSON.parse(localStorage.getItem("userRoles")).value.includes('ROLE_SHELTER_MANAGER')

  }
  ngOnInit() {

    this.menuItems = [

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

    ];
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  routeToAdoptPage() {
    if (this.isShelter)
      this.router.navigate(['shelter/adopt'])
    else
      this.router.navigate(['user/adopt'])
  }

  routeToHomePage() {
    if (this.isShelter)
      this.router.navigate(['shelter'])
    else
      this.router.navigate(['user'])
  }
}
