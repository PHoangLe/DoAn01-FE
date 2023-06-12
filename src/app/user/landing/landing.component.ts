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
        thumbnailImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        alt: "Description for Image 1",
        title: "Title 1"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 2",
        "title": "Title 2"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 3",
        "title": "Title 3"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 4",
        "title": "Title 4"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 5",
        "title": "Title 5"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 6",
        "title": "Title 6"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 7",
        "title": "Title 7"
      },
      {
        previewImageSrc: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "thumbnailImageSrc": "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Pet%2Fshelter-642842c33fc47402c13d9ffb%2F52-dve-1-co-gi-hay-trai-nghiem-nuoi-hang-tram-chu-cho-meo-1571283039548181653588.jpg?alt=media&token=0a26fde6-936b-4574-a8eb-0cfb48d8a2b1&_gl=1*12galcx*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NjU3ODY2Mi4zNC4xLjE2ODY1Nzg3MDEuMC4wLjA.",
        "alt": "Description for Image 8",
        "title": "Title 8"
      },
    ]
  }

}
