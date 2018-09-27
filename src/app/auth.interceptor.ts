import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()

export class RequestInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router, private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorage.retrieve('token');
    console.log(token);
    const ignoreUrl = "/login";
    if (request.url.search(ignoreUrl) === -1) {
      if (token) {
        var request = request.clone({
          headers: request.headers.set('token', token)
        });
        console.log('Token added to HTTP request');
        if (!request.headers.has('Content-Type')) {
          request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        console.log(request.headers);
        return next.handle(request)
          // .pipe(tap((event: HttpEvent<any>) => {
          //   if (event instanceof HttpResponse) {
          //     // console.log("Successful Response");
          //   }
          // }, (err: any) => {
          //   if (err instanceof HttpErrorResponse) {
          //     if (err.status === 401 || err.status === 403) {
          //       // console.log("ERROR CHECKED")
          //       this.router.navigate(['/userlogin/login']);
          //       this.localStorage.store("token", null);
          //     }
          //   }
          // }));
      }
      else {
        return next.handle(request)
          // .pipe(tap((event: HttpEvent<any>) => {
          //   if (event instanceof HttpResponse) {
          //     // console.log("Successful Response");
          //   }
          // }, (err: any) => {
          //   if (err instanceof HttpErrorResponse) {
          //     if (err.status === 401 || err.status === 403) {
          //       // console.log("ERROR CHECKED")
          //       this.router.navigate(['/userlogin/login']);
          //       this.localStorage.store("token", null);
          //     }
          //   }
          // }));;
      }
    }
    else {
      return next.handle(request);
    }
  }
}

// intercept(req: HttpRequest<any>, next: HttpHandler) {
//   console.log("I'm here");
//   const token = this.localStorage.retrieve("token");
//   console.log(token);
//   if(token) {
//     console.log("Adding Token");
//       const cloned = req.clone({
//           headers: req.headers.set("Authorization", "Bearer "+token)
//       });
//       console.log(cloned);
//       return next.handle(cloned);
//   } else {
//       return next.handle(req);
//   }
// }

      // request = request.clone({
      //   headers: request.headers.set('agentId', '1234')
      // })
      // request = request.clone({
      //   headers: request.headers.set('departmentId', '1')
      // })

//             // request = request.clone({
//       //   headers: request.headers.set('departmentId', '1')
//       // })
//       // console.log(request.headers);
//       // console.log("");
