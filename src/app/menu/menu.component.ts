import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { DishService } from '../services/dish.service';
import { expand, flyInOut } from '../animation/app.animation';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[];
   baseURL=baseURL;

  selectedDish: Dish = new Dish;
  errMess: string;

  constructor(private dishService: DishService,
    ) { }

  ngOnInit(): void {

    // this.dishService.getDishes()
    //   .then(dishes => this.dishes = dishes);
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes
      ,errmess => this.errMess = <any>errmess);

      
  }

  
}
