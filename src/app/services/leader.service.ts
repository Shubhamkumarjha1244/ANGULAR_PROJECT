import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of,delay,Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  ngOnInit(): void {}
 


  
  
  

  

  getleaders(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership').
    pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getLeader(id: number): Observable<leader> {
    return this.http.get<leader>(baseURL + 'leadership/' + id).
    pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getFeaturedleader(): Observable<leader> {
    return this.http.get<leader[]>(baseURL + 'leadership?featured=true').pipe(map(LEADERS => LEADERS[0])).
    pipe(catchError(this.processHTTPMsgService.handleError));;
  }

 


  

  
}
