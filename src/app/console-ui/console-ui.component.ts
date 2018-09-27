import { Component, OnInit } from '@angular/core';
import { Agent } from './agent';
import { TicketsService } from '../tickets.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material';
import { NotificationComponent } from './notification/notification.component';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-console-ui',
  templateUrl: './console-ui.component.html',
  styleUrls: ['./console-ui.component.css']
})
export class ConsoleUIComponent implements OnInit {

  agentDetails: Agent;
  agentEmail;
  httpHeader;
  token;
  notifications = [];
  notificationCount = 5;

  constructor(
    private service: TicketsService,
    private router: Router,
    private loginService: LoginService,
    private localStorage: LocalStorageService,
    private notificationService: NotificationService,
    public dialog: MatDialog
    // private toast: ToastrService
  )
  { }

  ngOnInit() {
    // this.toast.show(this.message);
    this.agentEmail = this.localStorage.retrieve("email");//this.loginService.getAgentEmail();
    this.notificationService.newNotification().subscribe(data => {
      this.notifications.push(data);
      this.notificationCount += 1;
    })
    console.log(this.notifications);
    // console.log("Retrieved Email", this.agentEmail);
    this.service.GetAgentDetails(this.agentEmail).subscribe(data => {
      this.agentDetails = data;
      // console.log(this.agentDetails);
    });
  }

  resetNotificationCount() {
    this.notificationCount = 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '50%',
      height: '70%',
      data: this.notificationCount
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logOut() {
    console.log("Log out");
    this.localStorage.store('token', null);
    this.localStorage.store('email', null);
    this.router.navigate(['/userlogin/login']);
  }
}
