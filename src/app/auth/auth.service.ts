import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, catchError,  tap, throwError } from 'rxjs';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

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
  authenticatedUser :  BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer  : any ;
  constructor(private http : HttpClient,private router : Router) { }

  signUp(email : string , password  : string ){
    return this.http.post<AuthResponseData>(this.AUTH_URL+"signUp?key="+environment.firebaseApiKey,{
       email , password ,returnSecureToken : true
    })
    .pipe(catchError(this.handleError),tap( response => this.handleAuth(response)))
  }

  login(email : string , password  : string ){
    return this.http.post<AuthResponseData>(this.AUTH_URL+"signInWithPassword?key="+environment.firebaseApiKey,{
       email , password ,returnSecureToken : true
    })
    .pipe(catchError(this.handleError),tap( response => this.handleAuth(response)))
  }

  logout(){
    this.authenticatedUser.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("userData")
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null
  }

  autoLogin(){
    const parsedUser : {email :  string,
       id : string,
       _token : string,
       _tokenExpirationDate : string, 
       roles : string[]} = JSON.parse(localStorage.getItem("userData"));
       if(!parsedUser) return ;
       const expirationDate = new Date(parsedUser._tokenExpirationDate);
       const loadedUser = new User(parsedUser.email,parsedUser.id,parsedUser._token,expirationDate,parsedUser.roles)
       if(loadedUser.token){
        this.authenticatedUser.next(loadedUser);
        this.autoLogout(expirationDate.getTime() - new Date().getTime())
       }
  }

  autoLogout(expirationTimeInMs : number){
    this.tokenExpirationTimer = setTimeout(() =>  {
      this.logout();
    },expirationTimeInMs)
  }

  private handleError(errRes : HttpErrorResponse){
    return throwError(errorMsgs[errRes?.error?.error?.message || "UNKNOWN"])
  }

  private handleAuth(resData : AuthResponseData) {
    const expiresInInMilliSeconds = resData.expiresIn*1000 ;
    const expirationDate = new Date(new Date().getTime() + expiresInInMilliSeconds);
    const user = new User(resData.email,resData.localId,resData.idToken,expirationDate,[]);
    this.authenticatedUser.next(user);
    localStorage.setItem("userData",JSON.stringify(user))
    this.autoLogout(expiresInInMilliSeconds)
  }

  public loadRoles(){
    const user  = this.authenticatedUser.value
    let roles :  string[] = []
    
    this.http.post(this.AUTH_URL+"lookup?key="+environment.firebaseApiKey,{
      idToken : user.token
    }).subscribe( (userInfo : {users : [{customAttributes  }]}) => {
      const customAttributes = userInfo.users[0].customAttributes;
      if(customAttributes)
       roles = JSON.parse(userInfo.users[0].customAttributes).roles 
      else 
       roles = ["READ", "WRITE"]
       user.roles=roles;
       this.authenticatedUser.next(user);
       localStorage.setItem("userData",JSON.stringify(user))
    })

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
