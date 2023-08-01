import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  isLogged: boolean = false;

  isAuthenticated() : Promise<Boolean>{
    return new Promise((resolve , reject ) => {
      setTimeout( () => {
        return resolve(this.isLogged);
      },500 )
    });
  }

  login(){
    this.isLogged = true;
  }

  logout(){
    this.isLogged = false;
  }
}
