import { Component, ElementRef,  ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-List.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild("f") form : NgForm;
  constructor(private slService : ShoppingListService){}

  addIngredient(){
    const ing = new Ingredient(this.form.value.name,this.form.value.amount)
    this.slService.addIngredient(ing);
  }

  onSubmit(){
    console.log(this.form)
  }

  onReset(){
    this.form.reset();
  }
}
