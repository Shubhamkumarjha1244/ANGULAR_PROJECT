import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';




@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders!: leader[];
 

  constructor(
    private leaderService: LeaderService
  ) { }

  ngOnInit(): void {
   
    this.leaderService.getleaders().subscribe(leaders=>this.leaders=leaders);
  }

}
