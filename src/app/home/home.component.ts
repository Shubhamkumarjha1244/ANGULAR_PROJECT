import { Component, OnInit ,Inject} from '@angular/core';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionsService } from '../services/promotions.service'; //promotion
import { Dish } from '../shared/dish';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';
import { expand, flyInOut } from '../animation/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})

export class HomeComponent implements OnInit {

  dish: Dish;
  promotion:Promotion;
  leader:leader;
  baseURL=baseURL;
  errMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionsService,private leaderservice: LeaderService,
    ) { }

  ngOnInit(): void {
    
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish
      ,errmess => this.errMess = <any>errmess);
    
    this.promotionservice.getFeaturedPromotion().subscribe(promotion =>this.promotion=promotion
      ,errmess => this.errMess = <any>errmess);
    
    this.leaderservice.getFeaturedleader().subscribe(leader=>this.leader=leader,
      errmess => this.errMess = <any>errmess);
  }

}
