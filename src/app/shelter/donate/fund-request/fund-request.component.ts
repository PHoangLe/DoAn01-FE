import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FundService } from 'src/app/services/fund.service';
import { RequestFundService } from 'src/app/services/request-fund.service';

@Component({
  selector: 'app-fund-request',
  templateUrl: './fund-request.component.html',
  styleUrls: ['./fund-request.component.less']
})
export class FundRequestComponent implements OnInit {
  ngOnInit(): void {
    this.getAllFunds();
  }


  fundTypeOptions: any;
  requestFundForm = this.builder.group({
    fundType: this.builder.control('', Validators.required),
    requestValue: this.builder.control('', Validators.required),
    requestDescription: this.builder.control('', Validators.required),
  })

  constructor(public ref: DynamicDialogRef,
    private builder: FormBuilder,
    private fundService: FundService,
    private fundRequestService: RequestFundService,
    private messageService: MessageService) {
  }

  getAllFunds() {
    this.fundService.getAllFunds().then((funds) => {
      this.fundTypeOptions = funds
    })
      .catch((err) =>
        console.log(err.error.message))
  }

  sendRequest() {
    console.log(this.requestFundForm.value)
    this.fundRequestService.sendRequest(this.requestFundForm.value).then((response) => {
      this.messageService.add({ key: 'fundReq', severity: 'success', summary: "Gửi yêu cầu thành công" });
      setTimeout(() => {
        this.ref.close();
      }, 1500);
    })
      .catch((err) => {
        console.log(err.error.message)
        this.messageService.add({ key: 'fundReq', severity: 'erroe', summary: err.error.message });

      })
  }
}
