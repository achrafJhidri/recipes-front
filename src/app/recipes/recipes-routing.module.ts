import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/auth-gard.guard';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"recipes", 
  canActivate : [authGuard] ,
  component : RecipesComponent , children : [
    {path : "" , component : RecipeStartComponent},
    {path : "new", component : RecipeEditComponent},
    {path : ":id", component : RecipeDetailComponent},
    {path : ":id/edit", component : RecipeEditComponent},
  ]},
  {path:"**", component : PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
