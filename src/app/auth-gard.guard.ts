import { inject } from '@angular/core';
import { CanActivateFn,CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state ) => {

  const router = inject(Router);
  return inject(AuthService).isAuthenticated()
  .then((isAuthenticated : boolean) => {
    if (isAuthenticated) return true;
    else 
        {
          router.navigate(["login"]);
          return false ;
        }
  });
};


export const authChildGuard: CanActivateChildFn = (route, state ) => {

  return authGuard(route,state);
};