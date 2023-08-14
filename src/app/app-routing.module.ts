import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:"", redirectTo : "/recipes",pathMatch : "full"},
  {path : "shopping", loadChildren : () => import("./shopping-list/shopping.module").then(module => module.ShoppingModule)},
  {path : "recipes", loadChildren : () => import("./recipes/recipes.module").then(module => module.RecipesModule)},
  {path : "login", loadChildren : () => import("./auth/auth.module").then(module => module.AuthModule)},
  {path:"**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
