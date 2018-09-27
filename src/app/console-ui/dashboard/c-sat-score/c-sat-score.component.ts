import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { csatDescription, csatScoreVsDate } from '../analytics-classes/csat-score';
import { CsatScoreService } from '../csat-score.service';
import { Csat } from '../analytics-classes/AnalyticsData';

@Component({
  selector: 'app-c-sat-score',
  templateUrl: './c-sat-score.component.html',
  styleUrls: ['./c-sat-score.component.css']
})
export class CSatScoreComponent implements OnInit {

  types: string[] = ["line", "stackedline", "fullstackedline"];
  csatData: Csat[];
  csatMetaData: csatDescription[];

  constructor(service: CsatScoreService) {
    service.getAnalyticsData().subscribe(data => {
      this.csatData = data.analyticscsat.reverse().slice(-5, -1).reverse();
      // console.log(data.analyticscsat[0].csatscore);
    })
    // service.getCsatMetaData()
    //   .subscribe(csatMetaData => {
    this.csatMetaData = [{
      value: "csat",
      name: "CustomerSatisfaction"
    }];
    console.log(this.csatMetaData);
  }

  customizeTooltip(arg) {
    return {
      text: arg.valueText
    }
  }

  ngOnInit() { }

}
