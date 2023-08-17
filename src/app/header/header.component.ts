import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  collapsed : boolean = true;
  isAuthenticated : boolean = false;
  isAdmin : boolean = false;
  authenticationSub : Subscription ;

  constructor (private authService : AuthService){

  }

  ngOnInit(): void {
    this.authenticationSub = this.authService.authenticatedUser.subscribe(user => {
      this.isAuthenticated = !!user;
      if(user){
        this.isAdmin= user.isAdmin();
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  onLogout(){
    if(this.isAuthenticated){
      this.authService.logout();
    }
  }
}
