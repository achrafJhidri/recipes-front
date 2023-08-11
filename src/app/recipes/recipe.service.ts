import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-List.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService  {

  readonly RECIPES_URL : string = "http://localhost:8080/recipes";
  recipesSubject : Subject<Recipe[]> = new Subject();
  recipeSelected : Subject<Recipe> = new Subject();

  constructor(private slService : ShoppingListService ,  private http : HttpClient ) { }

  getRecipies(){
      return this.http.get<Recipe[]>(this.RECIPES_URL);
  }

  addToShoppingList(recipe: Recipe){
    this.slService.addIngredients(recipe.ingredients);
  }


  getRecipieWithIndex(index: number) {
    return this.http.get<Recipe>(this.RECIPES_URL+"/"+index)
  }

  addRecipe(recipe: Recipe) {
    this.http.post<Recipe>(this.RECIPES_URL,recipe).subscribe(() => {
      this.getRecipies().subscribe(recipes => {
        this.recipesSubject.next(recipes)
      })
    });
  }
  editRecipe(index : number,recipe : Recipe) {
    this.http.put(this.RECIPES_URL+"/"+index,recipe).subscribe(value =>{
      //TODO control everyting went well in backend !
      this.fetchAndNotifyRecipesChange();
    })
  }

  deleteRecipe(index : number){
    this.http.delete(this.RECIPES_URL+"/"+index).subscribe(value =>{
      //TODO control everyting went well in backend !
      this.fetchAndNotifyRecipesChange();
    })
  }

  fetchAndNotifyRecipesChange(){ 
    this.getRecipies().subscribe(recipes => {this.recipesSubject.next(recipes)})
  }
}
