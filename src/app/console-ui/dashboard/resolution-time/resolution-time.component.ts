import { Component, OnInit } from '@angular/core';
import { CsatScoreService } from '../csat-score.service';

@Component({
  selector: 'app-resolution-time',
  templateUrl: './resolution-time.component.html',
  styleUrls: ['./resolution-time.component.css']
})
export class ResolutionTimeComponent implements OnInit {

  averageResolutionTime;

  constructor(private analyticsService: CsatScoreService) { }

  ngOnInit() {
    this.analyticsService.getAnalyticsData().subscribe(data => {
      this.averageResolutionTime = data.avgresolutiontime;
      console.log(this.averageResolutionTime);
    })
  }

}
