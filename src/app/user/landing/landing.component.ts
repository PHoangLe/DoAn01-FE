import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FundService } from 'src/app/services/fund.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {

  protected stat;
  protected listFunds;
  constructor(
    private autheSerive: AuthService,
    private fundService: FundService,
    private statisticService: StatisticService) { }

  ngOnInit() {
    this.getLandingStat();
    this.getAllFunds();
  }

  getLandingStat() {
    this.statisticService.getLandingStatistic().then((response) => {
      this.stat = response
    })
  }
  async getAllFunds() {
    await this.fundService.getAllFunds().then((funds) => {
      this.listFunds = funds;
    }).catch((err) => {
      console.log(err)
    })
    this.listFunds = this.listFunds.slice(0, 4)
    console.log(this.listFunds)
  }

}
