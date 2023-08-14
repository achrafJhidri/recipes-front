import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/auth-gard.guard';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path:"", 
  canActivate : [authGuard] ,
  component : RecipesComponent , children : [
    {path : "" , component : RecipeStartComponent},
    {path : "new", component : RecipeEditComponent},
    {path : ":id", component : RecipeDetailComponent},
    {path : ":id/edit", component : RecipeEditComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
