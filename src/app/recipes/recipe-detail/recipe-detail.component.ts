import { Component , Input, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe ;
  id : number;
  isLoading : boolean = true;
  errorMsg : string = null ;
  constructor(private recipeService : RecipeService,private route : ActivatedRoute,private router : Router){}
  
  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe);
  }


   
   
  
  ngOnInit(): void {
    //TODO refactor
    this.route.params.subscribe(
      (params : Params) => {
      this.id = params['id'];
      if(this.id){
        this.recipeService.getRecipieWithIndex(this.id).subscribe((recipe) => {
          this.recipe = recipe;
          this.isLoading = false;
        },(error ) => {
          this.isLoading = false;
          this.errorMsg = error.message
          
        });
      }
    },( error )=> {
      console.log(error);
    })
   
  }

  onDeleteRecipe(){
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate([""])
  }
}
