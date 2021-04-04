import { Component, OnInit } from '@angular/core';
import {iconAnimation, labelAnimation, sideNavAnimation} from '../../animation/animation';
import {SidebarService} from '../../shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
      sideNavAnimation(),
      iconAnimation(),
      labelAnimation()
  ]
})
export class SidebarComponent implements OnInit {

  sideNavState: any;

  constructor(private sideNavService: SidebarService) { }

  ngOnInit(): void {
    this.sideNavService.sideBareObservbal.subscribe(
        (navState: string) => {
          this.sideNavState = navState;
        }
    );
  }

}
