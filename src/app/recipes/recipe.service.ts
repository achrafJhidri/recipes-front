import { EventEmitter, Injectable, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/Ingredient';
import { ShoppingListService } from '../shopping-list/shopping-List.service';

@Injectable()
export class RecipeService {
 

  private recipes : Recipe[] = [
    new Recipe("pancakes","Fluffy pancakes","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK62GSZlxhbBCTGP1ldw97wXC4qwa1o2QwbQ&usqp=CAU",[new Ingredient("basla",66),new Ingredient("touma",15)]),
    new Recipe("beghrir","beghrir mt9oub mziaan","https://static.wixstatic.com/media/94e2e7_8ce40d0ac7dd4c3889f6513b7047af63~mv2.jpg/v1/fill/w_640,h_424,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/94e2e7_8ce40d0ac7dd4c3889f6513b7047af63~mv2.jpg",[new Ingredient("basla",2),new Ingredient("touma",10)]),
  ]
  selectedRecipe : EventEmitter<Recipe> = new EventEmitter(); 

  constructor(private slService : ShoppingListService) { }

  getRecipies(){
    return this.recipes.slice();
  }

  setSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
  addToShoppingList(recipe: Recipe){
    this.slService.addIngredients(recipe.ingredients);
  }


  getRecipieWithId(name: String): Recipe {
    return this.recipes.find((recipe ) => recipe.name===name);
  }
}
