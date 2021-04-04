import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Users} from '../../modules/users';
import {UsersService} from '../../shared/users.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    user: Users;
    id: number;
    fullname: string;
    image: Blob;
    email: string;
    password: string;
    users: Users[];

  constructor(private route:  ActivatedRoute , private userService: UsersService , private router: Router) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(
          (userData: Users) => {
            this.email = userData.email;
            this.fullname = userData.fullname;
            this.image = userData.image;
          },
          error => console.log(error)
      );
  }

  onRedirectUserList() {
      this.router.navigate(['admin/listUsers'])
  }

  onUpdateUser(userId: number) {
      this.router.navigate(['admin/updateUser' , userId]);
  }

  onDeleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(
          ()=> {
             if(confirm("are you sure that you want to delete this user with " + id)) {
               this.onRedirectUserList();
            }

          }
      );

  }

  onCanceld() {
      this.onRedirectUserList();
  }


}
