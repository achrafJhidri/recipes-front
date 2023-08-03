import { Component , OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { ShoppingListService } from './shopping-List.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{

 ingredients : Ingredient[]  ;
 changedIngredientsSub : Subscription

 constructor ( private shoppingListService : ShoppingListService){}

  ngOnInit(){
    this.changedIngredientsSub = this.shoppingListService.changedIngredients.subscribe((ingredients : Ingredient[]) => {
      this.ingredients=ingredients;
    },(error) => {console.log(error);})
    this.ingredients= this.shoppingListService.getIngredients();
  }
  canDeactivate() {
    return confirm("you have unsaved data, you sure you want to quit this page ?")
  };

  ngOnDestroy(){
    this.changedIngredientsSub.unsubscribe();
  }
}
