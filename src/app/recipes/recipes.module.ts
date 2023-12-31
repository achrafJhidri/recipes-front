import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [    
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipesComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ]
}) 
export class RecipesModule { }
