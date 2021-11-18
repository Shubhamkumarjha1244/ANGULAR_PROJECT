import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of,delay,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }


  ngOnInit(): void {}
 


  getleaders(): Observable<leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }
  
  getLeader(id: string): Observable<leader> {
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)); ;
  }

  getFeaturedleader(): Observable<leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }

  

  
}
