import { Component , OnInit} from '@angular/core';
import { Ingredient } from '../shared/Ingredient';
import { ShoppingListService } from './shopping-List.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

 ingredients : Ingredient[]  ;

 constructor ( private shoppingListService : ShoppingListService){}

 ngOnInit(){
  this.shoppingListService.changedIngredient.subscribe((ingredients : Ingredient[]) => {
    this.ingredients=ingredients;
  },(error) => {console.log(error);
  })
  this.ingredients= this.shoppingListService.getIngredients();
 }
 canDeactivate() {
    return confirm("you have unsaved data, you sure you want to quit this page ?")
};
}
