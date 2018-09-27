import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { queryParams } from './queryparams';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { TicketDetailsModal } from './ticket';
import { Agent } from './console-ui/agent';
import { EndUser } from './console-ui/enduser';

@Injectable({
  providedIn: 'root'
})

export class TicketsService {

  private _url: string = "http://35.221.76.107/tickets";
  // http://35.221.125.153:8083/api/Tickets

  private UserDetailUrl: string = "http://35.221.76.107/endusers/query?Name=";
  private _ticketStatusUpdateUrl: string = "http://35.221.76.107/status";
  private _ticketPriorityUpdateUrl: string = "http://35.221.76.107/priority";
  private _ticketCommentUpdateUrl: string = "http://35.221.76.107/updateComment";
  private agentUrl = "http://35.221.76.107/agents/query?Email=";

  // ----------------LINKS-------------------
  // http://172.23.238.239:5000/api/Tickets
  // http://35.189.155.116:8083/
  // ----------------------------------------

  token;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private querys = new Subject<queryParams>();

  getQueryParamsModel() {
    var k = this.querys.asObservable();
    return k;
  }

  updateQueryParamsModel(queryParams: queryParams) {
    console.log("update successful");
    this.querys.next(queryParams);
  }

  // getUserDetailsById() {
  //   var a = this.http.get(this.UserDetailUrl);
  //   // console.log(a);
  //   return a;
  // }

  getById(id) {
    return this.http.get<TicketDetailsModal>(`${this._url}/detail/${id}`);
  }

  getTicketsByFilter(queryParams: queryParams) {
    if (queryParams != null) {
      return this.http.get(this._url + '/filter?status=' + queryParams.status + '&source=' + queryParams.source + '&priority=' + queryParams.priority);
    } else {
      return this.http.get(`${this._url}/filter`);
    }
  }

  getTicketCount() {
    var countOfTickets = this.http.get(`${this._url}/count`)
    return countOfTickets;
  }

  addNewTicket(ticket) {
    return this.http.post(this._url, ticket);
  }

  getAllTickets() {
    return this.http.get(this._url);
  }

  updateIndividualTicketStatus(ticketId, selectedStatus) {
    var ticketData = { 'TicketId': ticketId, 'Status': selectedStatus };
    console.log(ticketData);
    return this.http.put(this._ticketStatusUpdateUrl, ticketData);
  }

  updateIndividualTicketPriority(ticketId, selectedPriority){
    var ticketPriorityData = {'TicketId': ticketId, 'Priority': selectedPriority};
    console.log(ticketPriorityData);
    return this.http.put(this._ticketPriorityUpdateUrl, ticketPriorityData);
  }

  updateIndividualTicketComment(ticketId, comment, createdBy){
    console.log("Comment Data: " + comment);
    var ticketCommentData = {'ticketid': ticketId, 'comment': comment, 'Createdby': createdBy};
    console.log(ticketCommentData);
    return this.http.put(this._ticketCommentUpdateUrl, ticketCommentData).subscribe(result => {
      // console.log('huhu');
    });
  }

  GetAgentDetails(agentEmail) {
    return this.http.get<Agent>(`${this.agentUrl}%22${agentEmail}%22`);
  }

  GetUserDetails(username) {
    return this.http.get<EndUser>(`${this.UserDetailUrl}%22${username}%22`);
  }
}
