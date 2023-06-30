import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FundService } from 'src/app/services/fund.service';
import { FundBankingComponent } from './fund-banking/fund-banking.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.less'],
  providers: [DialogService, MessageService]

})
export class DonateComponent implements OnInit {

  protected sortField = '';
  protected listFunds;
  protected isLoading = true;
  protected searchValue;
  protected selectedFund;
  private fundCopied;
  private fund;
  private ref: DynamicDialogRef;
  listFundTypes = [
    {
      id: 'ALL', value: 'Tất cả'
    },
    {
      id: 'FOOD', value: 'Thực phẩm'
    },
    {
      id: 'MEDICAL', value: 'Y tế'
    },
    {
      id: 'ENTERTAINMENT', value: 'Giải trí'
    },
    {
      id: 'FACILITY', value: 'Cơ sở vật chất'
    },
    {
      id: 'MULTI_PURPOSE', value: 'Nhiều mục đích'
    }
  ]

  constructor(
    private router: Router,
    private fundService: FundService,
    private dialogService: DialogService,
  ) {

  }
  ngOnInit(): void {
    this.getAllFunds();
  }

  protected breadcrumbItimes = [
    {
      label: 'Trang chủ',
      command: () => {
        this.router.navigate(['user/landing'])
      }
    },
    {
      label: 'Danh sách quỹ cứu trợ',
    }
  ];

  async getAllFunds() {
    await this.fundService.getAllFunds().then((funds) => {
      this.listFunds = funds;
      console.log(this.listFunds);
    }).catch((err) => {
      console.log(err)
    })
    this.isLoading = false;
    this.fundCopied = this.listFunds
  }

  openBankingComponent() {
    this.ref = this.dialogService.open(FundBankingComponent, {
      data: this.fund,
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      header: 'Ví điện tử MOMO'
    });
  }


  onFundClick(fund: any) {
    this.fund = fund;
    this.openBankingComponent();
  }

  onCheckboxShelterChange(event) {
    if (event.checked.length > 0) {
    }
    else {

    }
  }
  onCheckboxFundChange(fundTypeID: string) {
    this.listFunds = [...this.fundCopied];
    if (fundTypeID !== 'ALL') {
      this.listFunds = this.listFunds.filter(fund => fund.fundType === fundTypeID)
    }
  }
  onFundSearch() { }

}
