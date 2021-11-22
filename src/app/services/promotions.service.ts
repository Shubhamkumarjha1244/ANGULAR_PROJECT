import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of,delay,Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  ngOnInit(): void {}
 

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').
    pipe(catchError(this.processHTTPMsgService.handleError));;
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'Promotions?featured=true').pipe(map(promotions => promotions[0])).
    pipe(catchError(this.processHTTPMsgService.handleError));;
  }
  
}