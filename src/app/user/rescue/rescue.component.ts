import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Shelter } from 'src/app/model/Shelter';
import { ShelterService } from 'src/app/services/shelter.service';
import { Router } from '@angular/router';
import { RescueService } from 'src/app/services/rescue.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRescueComponent } from './add-rescue/add-rescue.component';
import { ApiAddressService } from 'src/app/services/api-address.service';


@Component({
  selector: 'app-rescue',
  templateUrl: './rescue.component.html',
  styleUrls: ['./rescue.component.less'],
  providers: [DialogService, MessageService]
})
export class RescueComponent {
  protected rescuePet;
  listProvince = new Array;
  listDistrict = new Array;
  listWard = new Array;

  protected isLoading = true;
  protected defaultRescuePets;
  protected selectedStatus: string;
  protected sortField = '';
  protected searchValue;
  protected rescueStatus = [
    { id: "All", value: "Tất cả" },
    { id: "WAITING", value: "Đang chờ" },
    { id: "PROCESSING", value: "Đang giải cứu" },
    { id: "COMPLETED", value: "Giải cứu thành công" },
    { id: "ABORTED", value: "Giải cứu không thành công" },

  ]
  protected breadcrumbItimes: MenuItem[];
  ref: DynamicDialogRef;
  constructor(
    private rescueService: RescueService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private apiAddress: ApiAddressService,

    private router: Router) {
  }

  ngOnInit(): void {

    // this.getAllRescuePost();
    this.getAlLPost();
    this.bindProvinces();
    this.breadcrumbItimes = [
      {
        label: 'Trang chủ',
        command: () => {
          this.router.navigate(['/user/landing'])
        }
      },
      {
        label: 'Danh sách cứu hộ',
      }
    ]
  }


  getAllRescuePost() {
    this.isLoading = true
    this.rescueService.getAllRescuePosts().then(response => {
      this.rescuePet = response
      this.defaultRescuePets = [...this.rescuePet]
    }).catch(err => {
      err => {
        console.log(err.error.message)
      }
    })
    this.isLoading = false
    console.log(this.rescuePet)
  }

  getAlLPost() {
    this.isLoading = false

    this.rescuePet = [
      {
        rescuePostID: "64a05c8349b0966ebf9e77d6",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fbe-meo-cham-soc-cho-04.jpg?alt=media&token=d6bbbccd-c87c-4c7a-be3f-ba2361eaea3b",
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fchu-cho-cho-chu-ve-1.jpg?alt=media&token=b1247283-8057-4ed4-9ad7-f7204a656066"
        ],
        poster: {
          userID: "642840900320f50fc8617a06",
          userEmail: "anhquandangho1@gmail.com",
          userFirstName: "Đặng",
          userLastName: "Hồ Anh Quân",
          phoneNo: "",
          dob: 1054425600,
          userGender: "MALE",
          userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA.",
          userRoles: [
            "ROLE_USER"
          ]
        },
        rescuer: null,
        animalDescription: "Hơi nhát, hoạt động bình thường",
        locationDescription: "Gần siêu thị Lotte",
        street: "Nguyễn Văn Lượng",
        ward: "Phường 7",
        district: "Quận Gò Vấp",
        city: "Thành phố Hồ Chí Minh",
        date: 1688231043030,
        status: "WAITING"
      },
      {
        rescuePostID: "64a05c8349b0966ebf9e77d6",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fbe-meo-cham-soc-cho-04.jpg?alt=media&token=d6bbbccd-c87c-4c7a-be3f-ba2361eaea3b",
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fchu-cho-cho-chu-ve-1.jpg?alt=media&token=b1247283-8057-4ed4-9ad7-f7204a656066"
        ],
        poster: {
          userID: "642840900320f50fc8617a06",
          userEmail: "anhquandangho1@gmail.com",
          userFirstName: "Đặng",
          userLastName: "Hồ Anh Quân",
          phoneNo: "",
          dob: 1054425600,
          userGender: "MALE",
          userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA.",
          userRoles: [
            "ROLE_USER"
          ]
        },
        rescuer: null,
        animalDescription: "Hơi nhát, hoạt động bình thường",
        locationDescription: "Gần siêu thị Lotte",
        street: "Nguyễn Văn Lượng",
        ward: "Phường 6",
        district: "Quận 1",
        city: "Thành phố Hồ Chí Minh",
        date: 1688231043030,
        status: "COMPLETED"
      },
      {
        rescuePostID: "64a05c8349b0966ebf9e77d6",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fbe-meo-cham-soc-cho-04.jpg?alt=media&token=d6bbbccd-c87c-4c7a-be3f-ba2361eaea3b",
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fchu-cho-cho-chu-ve-1.jpg?alt=media&token=b1247283-8057-4ed4-9ad7-f7204a656066"
        ],
        poster: {
          userID: "642840900320f50fc8617a06",
          userEmail: "anhquandangho1@gmail.com",
          userFirstName: "Đặng",
          userLastName: "Hồ Anh Quân",
          phoneNo: "",
          dob: 1054425600,
          userGender: "MALE",
          userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA.",
          userRoles: [
            "ROLE_USER"
          ]
        },
        rescuer: null,
        animalDescription: "Hơi nhát, hoạt động bình thường",
        locationDescription: "Gần siêu thị Lotte",
        street: "Nguyễn Văn Lượng",
        ward: "Phường 6",
        district: "Quận Gò Vấp",
        city: "Thành phố Hồ Chí Minh",
        date: 1688231043030,
        status: "PROCESSING"
      },
      {
        rescuePostID: "64a05c8349b0966ebf9e77d6",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fbe-meo-cham-soc-cho-04.jpg?alt=media&token=d6bbbccd-c87c-4c7a-be3f-ba2361eaea3b",
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fchu-cho-cho-chu-ve-1.jpg?alt=media&token=b1247283-8057-4ed4-9ad7-f7204a656066"
        ],
        poster: {
          userID: "642840900320f50fc8617a06",
          userEmail: "anhquandangho1@gmail.com",
          userFirstName: "Đặng",
          userLastName: "Hồ Anh Quân",
          phoneNo: "",
          dob: 1054425600,
          userGender: "MALE",
          userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA.",
          userRoles: [
            "ROLE_USER"
          ]
        },
        rescuer: null,
        animalDescription: "Hơi nhát, hoạt động bình thường",
        locationDescription: "Gần siêu thị Lotte",
        street: "Nguyễn Văn Lượng",
        ward: "Phường 6",
        district: "Quận Gò Vấp",
        city: "Thành phố Hồ Chí Minh",
        date: 1688231043030,
        status: "ABORTED"
      },
      {
        rescuePostID: "64a05c8349b0966ebf9e77d6",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fbe-meo-cham-soc-cho-04.jpg?alt=media&token=d6bbbccd-c87c-4c7a-be3f-ba2361eaea3b",
          "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/RescuePetImgs%2Frescue-642840900320f50fc8617a06%2Fchu-cho-cho-chu-ve-1.jpg?alt=media&token=b1247283-8057-4ed4-9ad7-f7204a656066"
        ],
        poster: {
          userID: "642840900320f50fc8617a06",
          userEmail: "anhquandangho1@gmail.com",
          userFirstName: "Đặng",
          userLastName: "Hồ Anh Quân",
          phoneNo: "",
          dob: 1054425600,
          userGender: "MALE",
          userAvatar: "https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fava-default_pfp.png?alt=media&token=f0abd1ae-d5c5-4b0f-b138-f3708619a963&_gl=1*ogemi8*_ga*OTI1NDQxNDAzLjE2Nzc2MzY3NTY.*_ga_CW55HF8NVT*MTY4NTkyOTYzNS4zMi4xLjE2ODU5Mjk2ODcuMC4wLjA.",
          userRoles: [
            "ROLE_USER"
          ]
        },
        rescuer: null,
        animalDescription: "Hơi nhát, hoạt động bình thường",
        locationDescription: "Gần siêu thị Lotte",
        street: "Nguyễn Văn Lượng",
        ward: "Phường 6",
        district: "Quận Gò Vấp",
        city: "Thành phố Hồ Chí Minh",
        date: 1688231043030,
        status: "WAITING"
      }
    ]
    this.defaultRescuePets = [...this.rescuePet]
  }

  addNewPost() {
    this.ref = this.dialogService.open(AddRescueComponent, {
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    })
  }



  onCheckboxStatusChange(event) {
    this.rescuePet = [...this.defaultRescuePets]
    if (event.value === "All") {
      return
    }
    this.rescuePet = this.rescuePet.filter(pet => pet.status === this.selectedStatus)
  }

  onUserSearched() {
    if (this.searchValue === "")
      this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter((pet) => {
      return Object.values(pet).some((value) => String(value).includes(this.searchValue))
    })
  }

  bindProvinces() {
    this.apiAddress.getProvinces().subscribe(response => {
      const rListProvince = response.data.data
      this.listProvince = rListProvince.map(rListProvince => {
        return {
          provName: rListProvince.name_with_type,
          provCode: rListProvince.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
  }

  provinceSelectedChange(selectedValue) {
    let foundProvince = this.listProvince.find(item => item.provName == selectedValue.provName);
    this.apiAddress.getDisctrictsByProvince(foundProvince.provCode).subscribe(response => {
      const rListDistrict = response.data.data
      this.listDistrict = rListDistrict.map(rListDistrict => {
        return {
          distName: rListDistrict.name_with_type,
          distCode: rListDistrict.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.city === selectedValue.provName)

  }

  districtSelectedChange(selectedValue) {
    this.apiAddress.getWardsByDistrict(selectedValue.distCode).subscribe(response => {
      const rListWard = response.data.data
      this.listWard = rListWard.map(rListWard => {
        return {
          wardName: rListWard.name_with_type,
          wardCode: rListWard.code
        }
      })
    }),
      err => {
        console.log(err.error.message)
      }
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.district === selectedValue.distName)
  }

  wardSelectedChange(selectedValue) {
    this.rescuePet = [...this.defaultRescuePets]
    this.rescuePet = this.rescuePet.filter(pet => pet.ward === selectedValue.wardName)
  }
}
