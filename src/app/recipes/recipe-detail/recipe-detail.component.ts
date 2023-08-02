import { Component , Input, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe ;

  constructor(private recipeService : RecipeService,private route : ActivatedRoute){}
  
  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
      const index = params['id'];
      if(index){
        this.recipe = this.recipeService.getRecipieWithIndex(index);
      }
    },( error )=> {
      console.log(error);
    })
   
  }
}
