import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { SignupService } from '../../signup.service';
import { LoginService } from '../../login.service';
import { OrganizationData } from '../organizationData';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-drag-drop-agent',
  templateUrl: './drag-drop-agent.component.html',
  styleUrls: ['./drag-drop-agent.component.css']
})
export class DragDropAgentComponent {

  public progress: number;
  public message: string;
  public UploadMessage: string = "";
  constructor(private http: HttpClient, private router: Router, private signUpService: SignupService, private localStorage: LocalStorageService) { }

  data: OrganizationData;

  public upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', 'http://35.221.125.153/upload', formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
      console.log(event);
    });
  }

  OnPost() {
    console.log("Post");
    console.log('getdata');
    this.UploadMessage = "Upload Successful";
    this.data = this.localStorage.retrieve("signUpData");
    console.log(this.data);
    this.signUpService.postAgentCSVtoDB(this.data).subscribe(data => {
      setTimeout(a => {
        console.log("POST WORKING");
        this.router.navigate(['/userlogin/addusers'])
      }, 1000);
    });
  }
}
