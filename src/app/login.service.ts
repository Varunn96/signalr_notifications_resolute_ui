import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OrganizationData } from './user-login/organizationData';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // tokenSubject = new BehaviorSubject("");

  // getTokenForComponents() {
  //   return this.tokenSubject.asObservable();
  // }

  // updateToken(token) {
  //   this.tokenSubject.next(token);
  // }

  agentEmail = "";

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  // loginUrl = Ip of the API Gateway for token generation
  loginUrl: string = "http://35.221.76.107/login";
  // loginUrl: string = "http://35.221.125.153:8081/api/Auth/login";

  getToken(form) {
    // const httpHeader = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };
    this.localStorage.store("email", form.Username);
    return this.http.post(this.loginUrl, form).pipe(catchError((error: HttpErrorResponse) => throwError(error.status || 'Server error')));
  }
}
