import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor() { }






  getPromotions():Promise<Promotion[]> {
    return Promise.resolve( PROMOTIONS);
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
  
}