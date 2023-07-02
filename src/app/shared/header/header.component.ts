import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu, MenuItemContent } from 'primeng/menu';
import { AuthService } from 'src/app/services/auth.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ChatComponent } from 'src/app/shelter/chat/chat.component';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { LoginComponent } from 'src/app/authenticate/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [LoginComponent]
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
  private stompClient = null;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private loginComponent: LoginComponent) {
    try {
      if (this.userID = this.authService.getDataFromCookie("userID")) {
        this.isLoggin = true
        this.imageUrl = (localStorage.getItem("userAvatar"))
        this.isShelter = this.authService.getDataFromCookie("userRoles").includes('ROLE_SHELTER_MANAGER')
      }
    }
    catch {
      console.log("There are no user")
    }
  }
  async ngOnInit() {

    this.unreadMessage = 0;
    this.connect();
    await this.getUnreadMessages();
    this.menuItems = [
      {
        label: 'Thông tin cá nhân',
        icon: 'pi pi-user',
        command: () => {
          if (this.isShelter)
            this.router.navigate(['/shelter/profile']);
          else
            this.router.navigate(['/user/profile']);

        }
      },
      {
        label: 'Đổi mật khẩu',
        icon: 'pi pi-replay',
        command: () => {
          this.router.navigate(['/change-password/'])
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
    })
      .catch(err => {
        console.log(err);
      })

    await this.listChatRoom.map((chatRoom) => {
      let recipientID = chatRoom.user1.userID === this.userID ? chatRoom.user2.userID : chatRoom.user1.userID;
      this.chatService.getUnreadMessageByRecipientID(this.userID, recipientID).then((count) => {
        if (count !== 0)
          this.unreadMessage++;
      })
    })
  }
  signOut() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    this.loginComponent.signOut();
    this.router.navigate(['/login'])
  }

  setUnreadMessage(unreadMessage: number) {
    this.unreadMessage = unreadMessage;
  }

  onNavbarClick(element: any) {
    const items = document.querySelectorAll(".nav-link");
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })
    element.target.classList.add("active")
  }

  public setActiveNavitem(element: any) {
    const items = document.querySelectorAll(".nav-link");
    const actived = document.getElementById(element) as HTMLElement;
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })

    actived.classList.add("active")
  }

  routeToAdoptPage() {
    if (this.isShelter)
      this.router.navigate(['shelter/adopt'])
    else
      this.router.navigate(['user/adopt'])
  }

  routeToHomePage() {
    if (this.isShelter)
      this.router.navigate(['shelter/landing'])
    else
      this.router.navigate(['user/landing'])
  }

  routeToDonatePage() {
    if (this.isShelter)
      this.router.navigate(['shelter/donation'])
    else
      this.router.navigate(['user/donation'])
  }

  routeToRescuePage() {
    if (this.isShelter)
      this.router.navigate(['shelter/rescue'])
    else
      this.router.navigate(['user/rescue'])
  }


  connect() {
    let Sock = new SockJS('https://doan01-be-production.up.railway.app/ws');
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    this.stompClient.subscribe('/private-message', this.onMessageSend);
    this.stompClient.subscribe('/user/' + this.authService.getDataFromCookie("userID") + '/private', this.onPrivateMessage);
  }

  onMessageSend = (payload) => {
  }

  onPrivateMessage = (payload) => {
    this.unreadMessage++;
    console.log(this.unreadMessage);
  }

  onError = (err) => {
    console.log(err);
  }
}
