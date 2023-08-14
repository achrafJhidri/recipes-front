import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogingMode = true;
  isLoading = false;
  errorMsg = null;
  constructor(private authSe : AuthService,private route : Router){
    
  }

  switchMode(){
    this.isLogingMode=!this.isLogingMode;
  }

  onSubmit(form: NgForm){
    this.errorMsg = null;
    if( ! form.valid ) 
      return; 
    const email = form.value.email;
    const password = form.value.password
    let obs : Observable<AuthResponseData> ;
    this.isLoading=true;
      if(this.isLogingMode){
        obs = this.authSe.login(email,password);
      }else {
        obs = this.authSe.signUp(email,password);
      }  

    obs.subscribe((res )=> {
        this.isLoading=false;
        this.route.navigate([''])
        },
        (errorMsg) => {
          this.errorMsg = errorMsg;
          this.isLoading=false;
        }
      )
  }
}
