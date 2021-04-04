import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // default state of the side Nav;
 private currentSideBareState = 'open';
 private sideBareStateChanged$: BehaviorSubject<string> = new  BehaviorSubject<string>(this.currentSideBareState);
 public sideBareObservbal = this.sideBareStateChanged$.asObservable();

  constructor() {
    this.sideBareStateChanged$.next('open');
  }

  toggele(): void  {
    this.currentSideBareState = this.currentSideBareState === 'open' ? 'close' : 'open';
    this.sideBareStateChanged$.next(this.currentSideBareState);
  }

}
