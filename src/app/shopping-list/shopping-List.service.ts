import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
 
  changedIngredients : Subject<Ingredient[]> = new Subject();
  editIngredientClicked : Subject<number> = new Subject();

  private ingredients : Ingredient[]  = [new Ingredient("basla",2),new Ingredient("touma",10)];

  onIngredientAdded( ingredient : Ingredient){
    this.ingredients.push(ingredient);
   }

  getIngredients(){
    return this.ingredients.slice();
   }


  onStartEdit(index : number ){
    this.editIngredientClicked.next(index);
  }

  addIngredient( newIng : Ingredient ){
    this.ingredients.push(...this.ingredients.filter(ingredient => ingredient.name=== newIng.name ).map(ing => { ing.amount=ing.amount+newIng.amount ; return ing }));
    this.ingredients.pop();
    this.notifyIngredientsChanges();
  }

  addIngredients(ingredients: Ingredient[]) {
    //TODO to merge results !
    this.ingredients.push(...ingredients)  
    this.notifyIngredientsChanges();
  }

  getIngredient(index : number ){
    return this.ingredients[index];
  }

  editIngredient(index : number , ingredient : Ingredient){
    this.ingredients[index] = ingredient;
    this.notifyIngredientsChanges();
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index,1);
    this.notifyIngredientsChanges();
  }

  notifyIngredientsChanges(){
    this.changedIngredients.next(this.ingredients.slice())
  }
}
