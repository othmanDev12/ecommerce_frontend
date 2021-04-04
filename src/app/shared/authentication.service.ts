/*import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Users} from '../modules/users';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   loginUrl: string = "http://localhost:8080/api/users/login"
  private token: any;
  private loggedInEmail: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(user: Users): Observable<HttpResponse<Users> | HttpErrorResponse> {
    return this.http.post<Users>(`${this.loginUrl}` , user , {observe: 'response'});
  }

  logout(): void {
    this.token = null;
    this.loggedInEmail = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token' , token);
  }

   addUserToLocalCache(user: Users): void {
    localStorage.setItem('user' , JSON.stringify(user));
  }

    getUserFromLocalCache(): Users {
    return JSON.parse(<string> localStorage.getItem('user'));
  }

  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInEmail = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }
}

 */
