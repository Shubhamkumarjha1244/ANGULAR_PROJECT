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
  promotion:Promotion;
  leader:leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionsService,private leaderservice: LeaderService) { }

  ngOnInit(): void {
    
    this.dishservice.getFeatureddish().subscribe(dish => this.dish = dish);
    
    this.promotionservice.getFeaturedPromotion().subscribe(promotion =>this.promotion=promotion);
    
    this.leaderservice.getFeaturedleader().subscribe(leader=>this.leader=leader);
  }

}
