import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authChildGuard, authGuard } from './auth-gard.guard';
import { LoginComponent } from './login/login.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path:"", redirectTo : "/recipes",pathMatch : "full"},
  {path:"recipes", 
  canActivate : [authGuard] , 
  canActivateChild : [authChildGuard],
  component : RecipesComponent , children : [
    {path : "" , component : RecipeStartComponent},
    {path : ":id", component : RecipeDetailComponent},
  ]},
  
  {path:"shopping", component : ShoppingListComponent , canDeactivate : [(component : ShoppingListComponent) => component.canDeactivate()]},
  {path:"login", component : LoginComponent},
  {path:"**", component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
