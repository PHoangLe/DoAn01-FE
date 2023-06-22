import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Fund } from 'src/app/model/Fund';
import { AuthService } from 'src/app/services/auth.service';
import { FundService } from 'src/app/services/fund.service';
import { FundRequestComponent } from './fund-request/fund-request.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.less'],
  providers: [MessageService, DialogService]
})
export class DonateComponent implements OnInit {

  protected isLoading = false;
  protected listFunds: any
  protected breadcrumbItimes = [
    {
      label: 'Trang chủ'
    },
    {
      label: 'Danh sách quỹ cứu trợ',
    }

  ];

  ref: DynamicDialogRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fundService: FundService,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {

  }
  ngOnInit(): void {
    this.getShelterFundTransactions();
  }

  getShelterFundTransactions() {
    this.fundService.getUserTransactions(this.authService.getDataFromCookie("userID")).then((transactions) => {
      this.listFunds = transactions;
      console.log(this.listFunds);
    })
  }

  requestFund() {
    this.ref = this.dialogService.open(FundRequestComponent, {
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    })
  }
}
