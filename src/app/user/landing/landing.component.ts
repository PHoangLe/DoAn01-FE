import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

  protected images: any[];

  constructor(private autheSerive: AuthService) { }

  ngOnInit() {
    this.images = [
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        alt: "Hành động ngay khi có yêu cầu trợ giúp",
        title: "Hành động"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F5253-khi-nhung-doi-cuu-ho-cho-meo-hoang-can-cuu-ho-174520.jpg?alt=media&token=19a5566f-0a42-4285-91f5-b6cd240c7739&_gl=1*18jhthj*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjYzMDk2OC4zNi4xLjE2ODY2MzA5NzYuMC4wLjA.",
        alt: "Chúng tôi là tổ chức phi lợi nhuận, được thành lập với mục đích hỗ trợ những bé chó mèo cơ nhỡ.",
        title: "Tâm huyết"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2Fhanoirescue-1--1634093967815.jpeg?alt=media&token=f845521e-dd87-416c-8773-294f51f49cab&_gl=1*1ff9qb1*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjYzODY1NC4zNy4wLjE2ODY2Mzg2NTQuMC4wLjA.",
        alt: "Chúng tôi luôn đảm bảo các bé có được môi trường chăm sóc tốt nhất cho đến khi tìm được chủ nhân mới.",
        title: "Trách nhiệm"
      },

    ]
  }

}
