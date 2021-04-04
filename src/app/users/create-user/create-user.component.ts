import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../../shared/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {patternValidator} from '../../validation/validation';
import {checkDuplicatedEmail} from '../../validation/checkEmail';
import {passwordValidator} from '../../validation/passwordValidation';
import {Users} from '../../modules/users';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

   userForm: FormGroup;
   selectedFile: File;
   changeImage = false;
   userData: Users;
   formData: FormData;
   loading: boolean;
   image: Blob;
   id: number;
   toggleMode: boolean = false;
   isAddMode: any;
   url: any;
   users: Users[] = [];
  constructor(private usersService: UsersService , private formBilder: FormBuilder ,
              private route: Router , private router: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.id = this.router.snapshot.params['id'];
      this.isAddMode = !this.id;
      this.userForm = this.formBilder.group({
        email: ['' , [Validators.required  , patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]
         , checkDuplicatedEmail(this.usersService)],
        password: ['' ,  [Validators.required , Validators.minLength(8) , Validators.maxLength(14) ,
            passwordValidator(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
        fullname: ['' , Validators.required ],
        file: ['']
    });

    if(!this.isAddMode) {
        this.loadUserDetail();
    }

  }

  loadUserDetail() {
      this.usersService.getUserById(this.id).subscribe(
          (user: Users) => {
              console.log(user);
              this.userData = user;
              this.userForm.patchValue(user);
              this.image = user.image;
              console.log(this.image);
          }
      )
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.formData = new FormData();
    this.formData.append('file' , this.selectedFile , this.selectedFile.name);
    this.formData.append('email' , this.userForm.controls.email.value);
    this.formData.append('password' , this.userForm.controls.password.value);
    this.formData.append('fullname' , this.userForm.controls.fullname.value);

    this.loading = true;
    if(this.isAddMode) {
        this.createUser();
    }
    else {
        this.updateUser();
    }
  }

  createUser() {
      this.usersService.createUser(this.formData).subscribe(
          () => {
            this.redirectToListUsers();
          }
      )
    alert("this user was created successfully ")

  }

  updateUser() {
      this.usersService.updateUser(this.formData , this.id).subscribe(
          () => {
            this.redirectToListUsers();

          }
      )
    alert("this user was updated successfully");
  }

  onChangeFile(event: any){
      this.selectedFile = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
      if(!this.isAddMode) {
          this.changeImage = true;
          this.toggleMode = true;
      }
      else {
        this.changeImage = true;
        this.toggleMode = true;
      }
  }


  redirectToListUsers() {
    this.route.navigate(['admin/listUsers']);
  }

  reset() {
      this.userForm.reset();
  }

  cancelAction() {
      this.redirectToListUsers();
  }

}
