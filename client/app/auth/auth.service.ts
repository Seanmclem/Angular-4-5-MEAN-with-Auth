import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import  'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserData } from '../../models/loggedInUser';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private statusSource = new BehaviorSubject<boolean>(false);
  loginStatus = this.statusSource.asObservable();

  private loggedInUserSource = new BehaviorSubject<UserData>(null);
  loggedInUser = this.loggedInUserSource.asObservable();
  //above are subscription/observable variables. managing auth status accross components

  constructor(private _http: Http) { }

  changeStatus(status: boolean) {
    this.statusSource.next(status);
  }

  changeUser(userData: UserData) {
    this.loggedInUserSource.next(userData);
  }

  checkIfUser(checkedUser) {
    return this._http.post("/api/verify-auth", checkedUser);
  }
  
  register(userData){
    return this._http.post("/api/register", userData);
  }

  login(userData){
    //const token = localStorage.getItem('token');
    return this._http.post("/api/login", userData);
  }

  logout(userData){
    return this._http.post("/logout", userData);
  }
}
