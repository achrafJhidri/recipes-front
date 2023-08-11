import { inject } from '@angular/core';
import { CanActivateFn,CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state ) => {

  const router = inject(Router);
  return inject(AuthService).authenticatedUser.pipe(
    take(1),
    map(user => {
    return !!user ? true : router.createUrlTree(["/login"]);
  }))
};


export const authChildGuard: CanActivateChildFn = (route, state ) => {

  return authGuard(route,state);
};