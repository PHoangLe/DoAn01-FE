import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth.service';
import { DonateService } from 'src/app/services/donate.service';

@Component({
  selector: 'app-fund-banking',
  templateUrl: './fund-banking.component.html',
  styleUrls: ['./fund-banking.component.less']
})
export class FundBankingComponent {
  fund: any;
  numberOfFunds = 1
  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private authService: AuthService,
    private donateService: DonateService) {
    this.fund = this.config.data

  }


  completeTransaction() {
    const userID = this.authService.getDataFromCookie("userID");
    this.donateService.completeDonation(userID, this.fund.fundID, this.numberOfFunds).then((res) => {
      console.log(res)
      this.messageService.add({ key: 'completeTransaction', severity: 'success', detail: 'Cảm ơn bạn! Chúng tôi sẽ xử lý sớm nhất' })
      setTimeout(() => {
        this.ref.close();
      }, 1500);
    }).catch(err => {
      console.log(err.error.message)
    })

  }
}
