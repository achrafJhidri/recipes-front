import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
   recipes:Recipe[];
   subscription : Subscription;
   isLoading = true
   errorMsg = null
  constructor(private recipeService : RecipeService, private router : Router, private route : ActivatedRoute ){}

   ngOnInit(): void {
    this.subscription = this.recipeService.recipesSubject.subscribe( (recipes : Recipe[]) =>  {
        this.recipes = recipes;
    });
    this.recipeService.getRecipies().subscribe(
      recipes => {
        this.isLoading = false;
        this.recipes = recipes;
    },
      error => {
        this.isLoading = false;
        this.errorMsg = error.message
      });
  }

  onCreateNewRecipe() {
    this.router.navigate(["new"],{relativeTo : this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
