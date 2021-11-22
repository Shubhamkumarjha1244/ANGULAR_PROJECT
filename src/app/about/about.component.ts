import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut, visibility } from '../animation/app.animation';
import { baseURL } from '../shared/baseurl';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      
      flyInOut(),visibility(),expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders: leader[];
  errMess: String;
  baseURL=baseURL;

  constructor(
    private leaderService: LeaderService
  ) { }

  ngOnInit(): void {
   

    this.leaderService.getleaders().subscribe(leaders => this.leaders = leaders
      ,errmess => this.errMess = <any>errmess);
  }

}
