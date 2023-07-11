import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private fundService: FundService,
    private statisticService: StatisticService) { }

  async ngOnInit() {
    await this.getLandingStat();
    await this.getAllFunds();
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
  }

  routeToRegisterPage() {
    const userRoles = localStorage.getItem('userRoles');
    if (!userRoles)
      this.router.navigate(['/login'])
    this.router.navigate(['/user/adopt']);
  }

  routeToDetailPage() {
    const userRoles = localStorage.getItem('userRoles');
    if (!userRoles)
      this.router.navigate(['/login'])
    this.router.navigate(['/user/rescue']);
  }

}
