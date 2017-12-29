import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/userModel';
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
  


  register(userData){

    this._authService.register(userData)
    .subscribe(res => { 
      this.model = new User("","","", "");
      this.router.navigate(['/login']);
    });

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
