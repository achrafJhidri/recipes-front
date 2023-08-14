import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {  authGuard } from './auth-gard.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:"", redirectTo : "/recipes",pathMatch : "full"},
  {path:"shopping", canActivate : [authGuard] , component : ShoppingListComponent , canDeactivate : [(component : ShoppingListComponent) => component.canDeactivate()]},
  {path:"login", component : AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
