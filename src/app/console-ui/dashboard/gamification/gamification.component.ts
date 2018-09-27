import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../tickets.service';
import { GamificationModel } from '../analytics-classes/GamificationModel';
import { CsatScoreService } from '../csat-score.service';

// export interface leastTime {
//   image_url: string;
//   agentName: string;
//   department: string;
//   resolutionTime: number;
// }

// const ELEMENT_DATA: GamificationData[] = [
//   {mostTickets: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 1", department: "Analytics",
//     numberOfTickets: 50, badge_url: "../../../../assets/images/gold.jpg"}},
//   {mostTickets: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 2", department: "Logistics",
//     numberOfTickets: 30, badge_url: "../../../../assets/images/silver.jpg"}},
//   {mostTickets: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 3", department: "IT",
//     numberOfTickets: 20, badge_url: "../../../../assets/images/bronze.jpg"}}
// ];

// , leastTime: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 1", department: "1", resolutionTime: 23}
// , leastTime: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 2", department: "2", resolutionTime: 22}
// , leastTime: {image_url: "../../../../assets/images/def_user.png", agentName: "Agent 3", department: "3", resolutionTime: 21}

@Component({
  selector: 'app-gamification',
  templateUrl: './gamification.component.html',
  styleUrls: ['./gamification.component.css']
})
export class GamificationComponent implements OnInit {

  displayedColumns: string[] = ['Most Tickets'];
  badges = [
    "../../../../assets/images/gold.jpg",
    "../../../../assets/images/silver.jpg",
    "../../../../assets/images/bronze.jpg"
  ]
  dataSource: GamificationModel[];

  constructor(private service: CsatScoreService) { }

  ngOnInit() {
    this.service.getGamificationData().subscribe(data => {
      this.dataSource = data;
      console.log("DATA");
      console.log(this.dataSource);
      let index = 0;
      this.dataSource.forEach(element => {
        element.BadgeUrl = this.badges[index];
        index += 1;
        console.log(index);
      });
    })

  }

}
