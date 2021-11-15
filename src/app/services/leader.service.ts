import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getleaders(): leader[] {
    return LEADERS;
  }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }

  getLeader(id: string): leader {
    return LEADERS.filter((promo) => (promo.id === id))[0];
  }

  getFeaturedleader(): leader {
    return LEADERS.filter((promotion) => promotion.featured)[0];
  }

  
}
