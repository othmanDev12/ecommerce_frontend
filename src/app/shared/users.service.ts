import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../modules/users';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
    getListurl: string = 'http://localhost:8080/api/users/allUsers';
    getUsersUrl: string = 'http://localhost:8080/api/users/listUsers';
    createUrl: string = 'http://localhost:8080/api/users/save';
    getUrl: string = 'http://localhost:8080/api/users';
    updateUrl: string = 'http://localhost:8080/api/users/update';
    deleteUrl: string = 'http://localhost:8080/api/users/delete';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    return this.http.get<Users[]>(`${this.getUsersUrl}`);
  }

  getListUsers(page: number , size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("pageNumber" , String(page));
    params = params.append("pageSize" , String(size));
    return this.http.get(`${this.getListurl}` , {params}).pipe(
      map(users =>  users)
    );
  }

  filteringWithPagingKeyword(page: number , size: number , keyword: string) :Observable<any> {
    let params = new HttpParams();
    params =  params.append("pageNumber" , String(page));
    params =  params.append("pageSize" , String(size));
    params = params.append("fullname" , keyword);

    return  this.http.get(`${this.getListurl}` , {params}).pipe(
      map(users => users)
    );
  }

  createUser(user: FormData): Observable<any> {
      return this.http.post(`${this.createUrl}` , user );
  }

  getUserById(userId: number): Observable<any> {
      return this.http.get<Users>(`${this.getUrl}/${userId}`);
  }

  updateUser(user: FormData , id: number): Observable<any>  {
      return  this.http.put<Users>(`${this.updateUrl}/${id}` , user);
  }

  deleteUser(userId: number): Observable<any> {
      return  this.http.delete(`${this.deleteUrl}/${userId}`);
  }

  addUsersToLocalCache(users: Users[]): void {
    localStorage.setItem('users' , JSON.stringify(users));
  }

  getUsersFromLocalCache(): Users[] | null {
    if(localStorage.getItem('users')) {
      return JSON.parse(<string> localStorage.getItem('users'));
    }
    return null;
  }

}
