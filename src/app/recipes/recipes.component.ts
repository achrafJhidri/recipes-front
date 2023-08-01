import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers : [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe : Recipe ;

  constructor(private recipeService : RecipeService, private route: ActivatedRoute){

  }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
      const name = params['id'];
      if(name){
        this.selectedRecipe = this.recipeService.getRecipieWithId(name);
      }
    },( error )=> {
      console.log(error);
    })
    this.recipeService.selectedRecipe.subscribe(
      (next : Recipe) => {this.selectedRecipe = next;},
      (error) => {console.log(error);})
  }



  onSelectRecipe(recipe : Recipe){
    this.selectedRecipe = recipe;
  }
}
