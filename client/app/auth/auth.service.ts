import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import  'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserData } from '../../models/loggedInUser';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable()
export class AuthService {

  private url: string = 'api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

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
    debugger;

    var checkedUserJson = checkedUser != null ? JSON.stringify(checkedUser) : JSON.stringify({});

    return this._http
    .post('/api/verify-auth', checkedUserJson, { headers: this.headers })
    .toPromise()
    .then(res => res.text());
  }
  
  register(userData){
    return this._http.post("/api/register", userData);
  }

  // login(userData){
  //   //const token = localStorage.getItem('token');
  //   return this._http.post("/api/login", userData);
  // }

  login(user): Promise<string> {
    return this._http
      .post('/api/login', JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.text());
  }

  logout(userData){
    return this._http.post("/logout", userData);
  }
}
