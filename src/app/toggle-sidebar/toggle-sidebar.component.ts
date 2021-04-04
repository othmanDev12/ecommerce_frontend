import { Component, OnInit } from '@angular/core';
import {SidebarService} from '../shared/sidebar.service';

@Component({
  selector: 'app-toggle-sidebar',
  templateUrl: './toggle-sidebar.component.html',
  styleUrls: ['./toggle-sidebar.component.css']
})
export class ToggleSidebarComponent implements OnInit {

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
  }


  toggleSideNav() {
    this.sideBarService.toggele();
  }

}
