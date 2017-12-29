import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../auth/auth.service";
import { Observable } from 'rxjs/Observable';
import { UserData } from '../../../models/loggedInUser';

@Injectable()
export class AuthGuard implements CanActivate {

  loggedIn: boolean = false;
  loggedInUser: UserData;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this._authService.loggedInUser.subscribe(userData => this.loggedInUser = userData);
      this._authService.loginStatus.subscribe(status => this.loggedIn = status);

      this._authService.checkIfUser(this.loggedInUser).subscribe(res => {
        this.loggedInUser = JSON.parse(res["_body"]); 

        this._authService.changeUser({
          id:this.loggedInUser.id, 
          email:this.loggedInUser.email
        });
        this._authService.changeStatus(true);

        if (!this.loggedIn) {
          // redirect the user
          this.router.navigate(['/login']);
          return false;
        }
      });



    return true;
  }

}
