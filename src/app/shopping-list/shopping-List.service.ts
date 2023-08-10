import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShoppingListService {
  readonly INGREDIENT_URL : string = "http://localhost:8080/ingredients";
 
  changedIngredients : Subject<Ingredient[]> = new Subject();
  editIngredientClicked : Subject<{index : number,ingredient : Ingredient}> = new Subject();

  constructor(private http : HttpClient){
    }

  getIngredients(){
    return this.http.get<Ingredient[]>(this.INGREDIENT_URL);
   }


  onStartEdit(element : {index : number,ingredient : Ingredient}){
      this.editIngredientClicked.next(element);
  }

  addIngredient( newIng : Ingredient ){
    this.http.post<Ingredient>(this.INGREDIENT_URL,newIng).subscribe(response => {
      this.getIngredients().subscribe(ingredients => {
        this.changedIngredients.next(ingredients)
      })
    })
  }

  addIngredients(ingredients: Ingredient[]) {
    this.http.post<Ingredient[]>(this.INGREDIENT_URL+"/list",ingredients).subscribe(response => {
      this.getIngredients().subscribe(ingredients => {
        this.changedIngredients.next(ingredients)
      })
    })
  }

  editIngredient(index : number , ingredient : Ingredient){
    this.http.put<Ingredient>(this.INGREDIENT_URL+"/"+index,ingredient).subscribe(response => {
      this.getIngredients().subscribe(ingredients => {
        this.changedIngredients.next(ingredients)
      })
    })
  }

  deleteIngredient(index : number){
    this.http.delete<Ingredient>(this.INGREDIENT_URL+"/"+index).subscribe(response => {
      this.getIngredients().subscribe(ingredients => {
        this.changedIngredients.next(ingredients)
      })
    })
  }
}
