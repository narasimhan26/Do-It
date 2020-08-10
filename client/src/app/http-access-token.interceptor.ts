import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpAccessTokenInterceptor implements HttpInterceptor {

  constructor() {}

  allowedURL: string[] = ["signin", "signup"];

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentURL = request.url.split("/").pop();
    if (!this.allowedURL.includes(currentURL)) {
      let token = localStorage.getItem('JWT_KEY');
      if (!!token) {
        request = request.clone({
          setHeaders: { 
            Authorization: `Bearer ${token}`
          }
      });
      }
    }
    return next.handle(request);
  }
}
