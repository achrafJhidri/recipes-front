import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
 
  changedIngredients : Subject<Ingredient[]> = new Subject();
  private ingredients : Ingredient[]  = [new Ingredient("basla",2),new Ingredient("touma",10)];

  onIngredientAdded( ingredient : Ingredient){
    this.ingredients.push(ingredient);
   }

   getIngredients(){
    return this.ingredients.slice();
   }

   addIngredient( ingredient : Ingredient ){
    this.addIngredients([ingredient])
   }

   addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.changedIngredients.next(this.ingredients.slice())
  }
}
