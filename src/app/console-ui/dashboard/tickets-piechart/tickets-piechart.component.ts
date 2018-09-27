import { Component, OnInit } from '@angular/core';
import { ticketstatus } from '../analytics-classes/ticketstatus';
import { CsatScoreService } from '../csat-score.service';
import { enableProdMode } from '@angular/core';
import { Count } from '../analytics-classes/AnalyticsData';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-tickets-piechart',
  templateUrl: './tickets-piechart.component.html',
  styleUrls: ['./tickets-piechart.component.css'],
  providers: [CsatScoreService]
})
export class TicketsPiechartComponent implements OnInit {

  pieChartdata: Count[];

  constructor(private analyticsService: CsatScoreService) {
    // console.log(this.pieChartdata);
    this.analyticsService.getAnalyticsData().subscribe((data) => {
      this.pieChartdata = data.analyticscount;
      console.log(this.pieChartdata);
    });
  }

  customizeLabel(arg) {
    return arg.valueText + " (" + arg.percentText + ")";
  }

  ngOnInit() {
  }

}
