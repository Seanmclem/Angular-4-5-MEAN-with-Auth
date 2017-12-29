import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './auth/auth.service';
import { UserData } from '../../models/loggedInUser';
import { Router } from '@angular/router';

//import '../../routes/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'app';

  loginStatus:boolean;
  loggedInUser: UserData;

  constructor(private _dataService: DataService, private _authService: AuthService, private router: Router){

  }

  logout(){
    this._authService.logout(this.loggedInUser).subscribe(res => { 
      //this.result = res;   check for error here?
      this._authService.changeStatus(false);
      this._authService.changeUser({
        id:null, 
        email:null
      });
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this._authService.loggedInUser.subscribe(userData => this.loggedInUser = userData);
    this._authService.loginStatus.subscribe(status => this.loginStatus = status);


    this._authService.checkIfUser(this.loggedInUser).subscribe(res => { //need to just check cookie, if not logged in throws error
      this.loggedInUser = JSON.parse(res["_body"]); 
      this._authService.changeUser({
        id:this.loggedInUser.id, 
        email:this.loggedInUser.email
      });
      this._authService.changeStatus(true);
    });
  }

}
