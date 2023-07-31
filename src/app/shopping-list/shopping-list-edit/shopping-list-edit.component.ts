import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-List.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  @ViewChild("ingredientName") ingredientName : ElementRef;
  @ViewChild("ingredientAmount") ingredientAmount : ElementRef;
 
  constructor(private slService : ShoppingListService){}

  addIngredient(){
    const ingredientName = this.ingredientName.nativeElement.value
    const ingredientAmount = this.ingredientAmount.nativeElement.value 
    const ing = new Ingredient(ingredientName,ingredientAmount)
    this.slService.addIngredient(ing);
  }
}
