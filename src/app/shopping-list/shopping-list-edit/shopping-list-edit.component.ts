import { Component,   OnDestroy,   OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient';
import { ShoppingListService } from '../shopping-List.service';
import {   FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isValid } from 'src/app/utils/utils';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {
  ingredientForm : FormGroup ;
  editMode : boolean = false ;
  index : number ;
  subscription : Subscription;
  constructor(private slService : ShoppingListService){}

  isValid(elementName : string){ 
    return isValid(this.ingredientForm,elementName);
  } 

  ngOnInit(): void {
    this.subscription = this.slService.editIngredientClicked.subscribe((response => {
      this.editMode = true ;
      this.index = response.index;
      this.ingredientForm.setValue({'name': response.ingredient.name, 'amount' : response.ingredient.amount});
    }))

    this.ingredientForm = new FormGroup({
      'name' : new FormControl(null,[Validators.required,Validators.minLength(2)]),
      "amount" : new FormControl(null,[Validators.min(1)])
    })
  }
 
  onSubmit(){    
    const ingredient = new Ingredient(this.ingredientForm.value.name,this.ingredientForm.value.amount);
    if(this.editMode){
      this.slService.editIngredient(this.index,ingredient)
    }else {
      this.slService.addIngredient(ingredient);
    }
    this.onReset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.index);
    this.onReset();
  }

  onReset(){
    this.ingredientForm.reset();
    this.editMode= false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
