import { Component , OnInit } from '@angular/core';
import {SidebarService} from './shared/sidebar.service';
import {mainContentAnimation} from './animation/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    animations: [
        mainContentAnimation()
    ]
})
export class AppComponent implements OnInit {
  title = 'ecommerceBack';
  sideNavState: any;

  constructor(private sideBarService: SidebarService ) {
  }


  ngOnInit(): void{
    this.sideBarService.sideBareObservbal.subscribe(
        (navState: string) => {
          this.sideNavState = navState;
        }
    );
  }
}
