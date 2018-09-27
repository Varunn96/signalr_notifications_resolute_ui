import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TicketsService } from '../../tickets.service';
import { textBinding } from '@angular/core/src/render3/instructions';


export class TemplateComponent {
  text1: string = "Enter your YAML snippet here";
  text2: string = "Enter your JSON snippet here";
  options:any = {maxLines: 1000, printMargin: false};
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})

export class PopUpComponent implements OnInit {

  constructor(private service: TicketsService, public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  text : string = "";

  ngOnInit() {
  }

  save(){
    console.log(this.text);
    this.dialogRef.close("IT WAS SAVED");
    console.log("huhu");
  }

}
