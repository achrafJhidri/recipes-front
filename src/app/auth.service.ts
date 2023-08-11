import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './shared/user.model';

 export interface AuthResponseData {
  email : string,
  expiresIn : number ,
  idToken : string ,
  kind : string ,
  localId : string,
  refreshToken : string,
  registered?: boolean
} 


@Injectable()
export class AuthService {
  readonly AUTH_URL : string = "https://identitytoolkit.googleapis.com/v1/accounts:";
  readonly API_KEY : string = "key=AIzaSyBrZ6dF0t-eCLKs-rlbTshHWdg_dQx6LHk";
  authenticatedUser :  Subject<User> = new Subject<User>();

  constructor(private http : HttpClient) { }

  signUp(email : string , password  : string ){
    return this.http.post<AuthResponseData>(this.AUTH_URL+"signUp?"+this.API_KEY,{
       email , password ,returnSecureToken : true
    })
    .pipe(catchError(this.handleError),tap( response => this.handleAuth(response)))
  }

  login(email : string , password  : string ){
    return this.http.post<AuthResponseData>(this.AUTH_URL+"signInWithPassword?"+this.API_KEY,{
       email , password ,returnSecureToken : true
    })
    .pipe(catchError(this.handleError),tap( response => this.handleAuth(response)))
  }

  logout(){
    this.authenticatedUser.next(null);
  }

  private handleError(errRes : HttpErrorResponse){
    return throwError(errorMsgs[errRes?.error?.error?.message || "UNKNOWN"])
  }

  private handleAuth(resData : AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn*1000 );
    this.authenticatedUser.next(new User(resData.email,resData.localId,resData.idToken,expirationDate));
  }
}

const errorMsgs : {[key: string]: string} = {
    'EMAIL_NOT_FOUND' :  "This email doesn't exist, try to signUp first !" , 
    'INVALID_PASSWORD' :  "Invalid password" , 
    'USER_DISABLED' :  "Disabled user, please contact the admin @Admin" , 
    'EMAIL_EXISTS' :  "This email exists already, try Login" , 
    'OPERATION_NOT_ALLOWED' :  "Login with password is not allowed" , 
    'TOO_MANY_ATTEMPTS_TRY_LATER' :  "Too many request please retry later" ,
    'UNKNOWN' : "An unknown Error occurred" 
}
