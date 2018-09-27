import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OrganizationData } from './user-login/organizationData';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private customerData: OrganizationData;

  // getData() {
  //   console.log("GETDATA");
  //   var k = this.customerData;
  //   console.log(k);
  //   return(k);
  // }

  // updateData(updatedData: OrganizationData) {
  //   console.log(updatedData);
  //   this.customerData = updatedData;
  // }

  _url: string = "http://35.221.76.107/signup"
  _agentCSVtoDB: string ="http://35.221.76.107/agents"
  _userCSVtoDB: string ="http://35.221.76.107/endusers"

  post(form) {
    console.log(form)
    return this.http.post(this._url, form);
  }

  postAgentCSVtoDB(fileData) {
    console.log(fileData)
    return this.http.post(this._agentCSVtoDB, fileData);
  }

  postUserCSVtoDB(fileData) {
    console.log(fileData)
    return this.http.post(this._userCSVtoDB, fileData);
  }


  constructor(private http: Http) { }
}
