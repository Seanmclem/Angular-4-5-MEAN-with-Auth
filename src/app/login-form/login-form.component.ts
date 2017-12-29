import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/userModel';
import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../../../models/loggedInUser';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private _dataService: DataService, private _authService: AuthService, private router: Router) {

  }

  model = new User("","","", "");
  userName: string = "";
  submitting: boolean = false;
  loginStatus: boolean = false;
  loggedInUser: UserData;

  login(loginData){
    this._authService.login(loginData).subscribe(res => { 

      this.loggedInUser = JSON.parse(res["_body"]);
      this.submitting = false;
      this._authService.changeUser({
        id:this.loggedInUser.id, 
        email:this.loggedInUser.email
      });
      this._authService.changeStatus(true);
      this.router.navigate(['/account']);      
    });
  }

  ngOnInit() {
    this._authService.loggedInUser.subscribe(userData => this.loggedInUser = userData);
    this._authService.loginStatus.subscribe(status => this.loginStatus = status);
  }


  onSubmit(userData) {
    this.submitting = true;
    this.login(userData);
  }

  //get diagnostic() { return JSON.stringify(this.model); 
}
