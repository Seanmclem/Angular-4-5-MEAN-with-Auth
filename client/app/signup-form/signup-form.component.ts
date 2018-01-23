import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/userModel';
import { DataService } from '../data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(private _dataService: DataService, private _authService: AuthService, private router: Router) {

  }
  
  errorMessage: string = "";

  register(userData){
    //can check if passwords match or fields completed right here on front end
    this.errorMessage = "";

    if (userData.email && userData.password && userData.passwordConf) { //has all fields
     
        if (userData.password !== userData.passwordConf){
          this.submitting = false;
          this.errorMessage = "passwords must match";
        } else {//passwords match
          if(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email)){//is valid email
            this._authService.register(userData)
            .subscribe(res => { 
              var result = JSON.parse(res["_body"]);
              if(result.success){
                this.model = new User("","","", "");//needed?
                this.router.navigate(['/login']);
              } else {
                this.submitting = false;
                this.errorMessage = result.message;
              }

            }); 
          } else {//invalid email
            this.submitting = false;
            this.errorMessage = "Please use a valid email address. Example: joe@abc.com";
          }
     
        }
      } else { // some fields missing
        this.errorMessage = "All fields required";
      }
  }


  ngOnInit() {
  }

  model = new User("","","", "");

  submitting: boolean = false;

  onSubmit(userData) {
    this.submitting = true;
    this.register(userData);
  }

  get diagnostic() { return JSON.stringify(this.model); }

  newUser() {
  this.model = new User('','', '');
  }

}
