import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith("https://identitytoolkit.googleapis.com"))
      return next.handle(req)
    else {
      return this.authService.authenticatedUser.pipe(
          take(1),
          exhaustMap(user => {
            if(user)
            {
              const httpHeaders = new HttpHeaders().append("Authorization","Bearer "+user.token);
              const modifiedReq = req.clone({headers : httpHeaders });
              return next.handle(modifiedReq);
            }else
              return next.handle(req)
        }))
    }

  }
}
