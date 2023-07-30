import { Component } from '@angular/core';
import { Ingredient } from '../shared/Ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
 public ingredients : Ingredient[]  = [new Ingredient("basla",2),new Ingredient("touma",10)];
}
