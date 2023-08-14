import { Component , OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { ShoppingListService } from './shopping-List.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{

 ingredients : Ingredient[]  ;
 isLoading =  true;
 errorMsg = null;
 changedIngredientsSub : Subscription ;
 constructor ( private shoppingListService : ShoppingListService){}

  ngOnInit(){
    this.changedIngredientsSub = this.shoppingListService.changedIngredients.subscribe((ingredients : Ingredient[]) => {
      this.ingredients=ingredients;
    },(error) => {console.log(error);})
    this.shoppingListService.getIngredients().subscribe(
      ingredients => {
        this.isLoading = false;
        this.ingredients= ingredients ;},
      error => {
        this.isLoading = false;
        this.errorMsg = error.message
        
    });
  }
  canDeactivate() {
    return confirm("you have unsaved data, you sure you want to quit this page ?")
  };

  ngOnDestroy(){
    this.changedIngredientsSub.unsubscribe();
  }

  onStartEdit(index : number ,ingredient : Ingredient){
      this.shoppingListService.onStartEdit({index,ingredient});
  }
}
