import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  post(url: string, body: any, options?: any): Observable<any> {
    return this.http.post(url, body, options);
  } 
  get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }
  delete(url: string, body: any): Observable<any> {
    return this.http.delete(url, body);
  }
  put(url: string, body: any, options?: any): Observable<any> {
    return this.http.put(url, body, options);
  }
}
