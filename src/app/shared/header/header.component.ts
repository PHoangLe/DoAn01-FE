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


  protected navbar = [
    {
      navID: 'home',
      isActive: false
    },
    {
      navID: 'rescue',
      isActive: false
    },
    {
      navID: 'adopt',
      isActive: false
    },
    {
      navID: 'donate',
      isActive: false
    }
  ]
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private loginComponent: LoginComponent) {
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
    this.connect();
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
    this.loginComponent.signOut();
    this.router.navigate(['/login'])
  }


  onNavbarClick(element: any) {
    const items = document.querySelectorAll(".nav-link");
    items.forEach((item) => {
      item.classList.remove("active")
      item.removeAttribute("style");
    })
    element.target.classList.add("active")
    console.log(element.target.classList)

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



  connect() {
    let Sock = new SockJS('https://doan01-be-production.up.railway.app/ws');
    // let Sock = new SockJS('http://localhost:8080/ws');

    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    this.stompClient.subscribe('/private-message', this.onMessageSend);
    this.stompClient.subscribe('/user/' + JSON.parse(localStorage.getItem("userID")).value + '/private', this.onPrivateMessage);
  }

  onMessageSend = (payload) => {
  }

  onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    this.unreadMessage++;
  }

  onError = (err) => {
    console.log(err);
  }
}
