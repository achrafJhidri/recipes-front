import { Component , Input, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe ;

  constructor(private recipeService : RecipeService){}
  
  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe);
  }

  ngOnInit(): void {

  }
}
