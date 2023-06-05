import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  imageUrl: string
  userID: string
  menuItems: MenuItem[]
  userRole: string
  isLoggin = false;
  isShelter: false;
  unreadMessage: number;
  listChatRoom: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService) {
    try {
      if (this.userID = JSON.parse(localStorage.getItem("userID")).value) {
        this.isLoggin = true
        this.imageUrl = (JSON.parse(localStorage.getItem("userAvatar")).value)
        this.isShelter = JSON.parse(localStorage.getItem("userRoles")).value.includes('ROLE_SHELTER_MANAGER')
      }
    }
    catch {
      console.log("There are no user")
    }
  }
  async ngOnInit() {
    this.unreadMessage = 0;
    await this.getUnreadMessages();
    this.menuItems = [
      {
        label: 'Thông tin cá nhân',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/user/profile']);
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


  async getUnreadMessages() {
    await this.chatService.getChatRooom().then((chatRoom) => {
      this.listChatRoom = chatRoom;
      console.log(this.listChatRoom);
    })
      .catch(err => {
        console.log(err);
      })

    await this.listChatRoom.map((chatRoom) => {
      let recipientID = chatRoom.user1.userID === this.userID ? chatRoom.user2.userID : chatRoom.user1.userID;
      this.chatService.getUnreadMessageByRecipientID(this.userID, recipientID).then((count) => {
        console.log(count);
        if (count !== 0)
          this.unreadMessage++;
      })
    })
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
