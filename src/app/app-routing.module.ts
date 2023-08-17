import {  NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:"", redirectTo : "/recipes",pathMatch : "full"},
  {path : "shopping", loadChildren : () => import("./shopping-list/shopping.module").then(module => module.ShoppingModule)},
  {path : "recipes", loadChildren : () => import("./recipes/recipes.module").then(module => module.RecipesModule)},
  {path : "login", loadChildren : () => import("./auth/auth.module").then(module => module.AuthModule)},
  {path : "admin", loadChildren : () => import("./admin/admin.module").then(module => module.AdminModule)},
  {path:"**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
