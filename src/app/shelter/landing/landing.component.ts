import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  protected pageStat: any;
  protected fundChartData;
  protected rescuePost;
  protected petChartData;
  protected isLoading: boolean = false;
  receivedFund = Array.from({ length: 12 }).fill(0);
  constructor(
    private statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.getPageData();
  }

  getPageData() {
    // this.statisticService.getShelterLandingStatistic().then(response => {
    //   this.pageDate = response;
    //   console.log(this.pageDate);
    // })
    this.pageStat = {
      "totalNumbersOfAnimal": 9,
      "totalNumberOfAdoptedAnimal": 2,
      "totalNumberOfRescuePostCompleted": 2,
      "adoptedAnimalByMonth": {
        "6": 1,
        "7": 1
      },
      "adoptionRequestByMonth": {
        "6": 1,
        "7": 2
      },
      "totalNumberOfRescuePostCompletedByMonth": {
        "7": 2
      },
      "totalOfFundReceivedByMonth": {
        "6": {
          "count": 1,
          "sum": 15000,
          "min": 15000,
          "max": 15000,
          "average": 15000.0
        }
      }
    }
    this.fundChartData = {
      title: 'Main chart',
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: "Quỹ vào",
          backgroundColor: '#3399ff',
          data: this.getfundChartData(this.pageStat.totalOfFundReceivedByMonth)
        }

      ]
    }

    this.rescuePost = {
      title: 'Main chart',
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [
        {
          label: "Giải cứu thành công",
          backgroundColor: '#2eb85c',
          data: this.getBasicStat(this.pageStat.totalNumberOfRescuePostCompletedByMonth)
        }
      ],

    }

    this.petChartData = {
      title: 'Main chart',
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      datasets: [

        {
          label: "Yêu cầu nhận nuôi",
          backgroundColor: '#3399ff',
          data: this.getBasicStat(this.pageStat.adoptionRequestByMonth)
        },
        {
          label: "Thú cưng được nhận nuôi",
          backgroundColor: '#2eb85c',
          data: this.getBasicStat(this.pageStat.adoptedAnimalByMonth)
        },
      ]
    }

  }

  getfundChartData(object) {
    let fundMap = new Map(Object.entries(object));
    let data = Array.from({ length: 12 }).fill(0);

    for (let i = 0; i < 12; i++) {
      if (fundMap.get((i + 1).toString()) !== undefined) {
        let fund = new Map(Object.entries(fundMap.get((i + 1).toString())));
        data[i] = fund.get("sum")
      }
    }
    return data
  }

  getBasicStat(object) {
    let fundMap = new Map(Object.entries(object));
    let data = Array.from({ length: 12 }).fill(0);

    for (let i = 0; i < 12; i++) {
      if (fundMap.get((i + 1).toString()) !== undefined) {
        data[i] = (fundMap.get((i + 1).toString()));
      }
    }
    return data
  }
}
