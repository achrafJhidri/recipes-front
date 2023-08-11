import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {  authGuard } from './auth-gard.guard';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:"", redirectTo : "/recipes",pathMatch : "full"},
  {path:"recipes", 
  canActivate : [authGuard] ,
  component : RecipesComponent , children : [
    {path : "" , component : RecipeStartComponent},
    {path : "new", component : RecipeEditComponent},
    {path : ":id", component : RecipeDetailComponent},
    {path : ":id/edit", component : RecipeEditComponent},
  ]},
  
  {path:"shopping", canActivate : [authGuard] , component : ShoppingListComponent , canDeactivate : [(component : ShoppingListComponent) => component.canDeactivate()]},
  {path:"login", component : AuthComponent },
  {path:"**", component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
