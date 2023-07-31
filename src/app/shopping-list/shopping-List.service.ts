import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient';

@Injectable()
export class ShoppingListService {
 
  changedIngredient : EventEmitter<Ingredient[]> = new EventEmitter();
  private ingredients : Ingredient[]  = [new Ingredient("basla",2),new Ingredient("touma",10)];

  onIngredientAdded( ingredient : Ingredient){
    this.ingredients.push(ingredient);
   }

   getIngredients(){
    return this.ingredients.slice();
   }

   addIngredient( ingredient : Ingredient ){
    this.ingredients.push(ingredient);
    this.changedIngredient.emit(this.ingredients.slice())
   }

   addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.changedIngredient.emit(this.ingredients.slice())
  }
}
