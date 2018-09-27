import { Pipe, PipeTransform, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../tickets.service';
import { Ticket, TicketDetailsModal } from '../../ticket';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { LocalStorageService } from 'ngx-webstorage';
import { DomSanitizer } from "@angular/platform-browser";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface Options {
  value: string;
  viewValue: string;
}

@Pipe({name: "safe"})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-individual-ticket',
  templateUrl: './individual-ticket.component.html',
  styleUrls: ['./individual-ticket.component.css']
})

export class IndividualTicketComponent implements OnInit {
  ConnectionId: string;
  Type: string;
  Email: string;
  selectedStatusValue: string ;
  selectedPriorityValue: string ;
  commentValue: string;
  TicketById: TicketDetailsModal;
  UserName;
  chatHubUrl: string;
  agentDetails:TicketsService;
  userImage;

  myControl = new FormControl();
  options: string[] = ['Intent One', 'Intent Two', 'Intent Three'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router, private service: TicketsService, private route: ActivatedRoute, public dialog: MatDialog, private localStorage: LocalStorageService) { }

  ngOnInit() {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.call(id);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.ConnectionId = "chonnect";
    this.Type = "agent";
    this.Email = "emailagentka";
    this.chatHubUrl = `http://172.23.238.235:4200?connectionId=${this.TicketById.id}&type=${this.Type}`;
    console.log(this.chatHubUrl);

  }

  call(id) {
    let u = this.service.getById(id).subscribe(data => {
      this.TicketById = data;
      console.log(this.TicketById.userid);
    });
    console.log(u);
  }

   _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  back(){
    this.router.navigate(['/console/tickets/all'])
  }

  updateStatus(){
    console.log(this.selectedStatusValue);
    this.service.updateIndividualTicketStatus(this.TicketById.id,this.selectedStatusValue).subscribe();
  }

  updatePriority(){
    this.service.updateIndividualTicketPriority(this.TicketById.id,this.selectedPriorityValue).subscribe();
  }

  statuses: Options[] = [
    {value: "open", viewValue: 'Open'},
    {value: "close", viewValue: 'Closed'},
    {value: "due", viewValue: 'Due'}
  ];

  priorities: Options[] = [
    {value: "high", viewValue: 'High'},
    {value: "medium", viewValue: 'Medium'},
    {value: "low", viewValue: 'Low'}
  ];


  //Opening and closing of the Modal


  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      panelClass: 'my-panel',
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
