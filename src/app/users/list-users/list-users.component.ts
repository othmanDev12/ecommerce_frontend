import {Component, OnInit, ViewChild} from '@angular/core';
import {Users} from '../../modules/users';
import {UsersService} from '../../shared/users.service';
import { Router} from '@angular/router';
import {UsersPaging} from '../../modules/usersPaging';
import {map} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  listUsers: Users[] =[];
  users: Users[] = [];
  fullname: string;
  email: string;
  filteringValue: string;
  dataSource: UsersPaging;
  displayedColumns: string[] = ['image' , 'email' , 'fullname' , 'action']
  pageEvent: PageEvent;
  totalElements: number;
  size: number;


  @ViewChild(MatSort , {static: true}) sort: any;
  constructor(private usersService: UsersService , private route: Router) {
  }

  ngOnInit(): void {
    this.usersService.getListUsers(0 , 6).pipe(
      map((userData: UsersPaging) => {
        this.dataSource = userData;
        this.listUsers = this.dataSource.content;
        this.totalElements = this.dataSource.totalElements;
        this.size = this.dataSource.size;
      })
    ).subscribe();
    this.usersService.getUsers().subscribe(
      (usersData: Users[]) => {
        this.users = usersData;
      }
    )
  }


  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    console.log(page);
    let size = event.pageSize;
    console.log(size);

    if(this.filteringValue == undefined) {
      this.usersService.getListUsers(page , size).pipe(
        map((userData: UsersPaging) => {
          this.dataSource = userData;
          this.listUsers = this.dataSource.content;
        })
      ).subscribe();
    }
    else {
      this.usersService.filteringWithPagingKeyword(page , size , this.filteringValue).pipe(
        map((userData: UsersPaging) => {
          this.dataSource = userData;
          this.listUsers = this.dataSource.content;
        })
      );
    }
  }

  filteringWithFullName(keyword: string) {
    this.usersService.filteringWithPagingKeyword(0 , 6 , keyword).pipe(
      map((userData: UsersPaging) => {
        this.dataSource  = userData;
        this.listUsers = this.dataSource.content;
      })
    ).subscribe();
  }


  onAddUser() {
    this.route.navigate(['admin/createUser']);
  }


  onShowDetail(userId: number) {
    this.route.navigate(['admin/detailUser' , userId]);
  }

}
