import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionsService } from '../services/promotions.service'; //promotion
import { Dish } from '../shared/dish';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader:leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionsService,private leaderservice: LeaderService) { }

  ngOnInit(): void {
    
    this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    
    this.promotionservice.getFeaturedPromotion().then(promotion =>this.promotion=promotion);
    
    this.leaderservice.getFeaturedleader().then(leader=>this.leader=leader);
  }

}
