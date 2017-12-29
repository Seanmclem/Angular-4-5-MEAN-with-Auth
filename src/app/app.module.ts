import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    HomeComponent,
    AccountComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    DataService, 
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}
