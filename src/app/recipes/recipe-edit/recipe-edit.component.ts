import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/Ingredient';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  recipeForm : FormGroup;
  editMode : boolean = false ;
  recipe : Recipe = null; 
  id : number  = null;
  constructor(private route : ActivatedRoute, private recipeService : RecipeService,private router : Router){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.id  = params["id"];
        this.editMode = this.id != null;
        this.initForm();
    })
  }

  initForm(){
    let recipeName : String= ''
    let recipeImagePath : String = ''
    let recipeDescription : String = ''
    let ingredientsFormcontrolls : FormGroup[] = [] ; 

    if(this.editMode){
      this.recipe = this.recipeService.getRecipieWithIndex(this.id);
      recipeName = this.recipe.name;
      recipeImagePath =this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      ingredientsFormcontrolls  =  this.recipe.ingredients
                                        .map((ingredient : Ingredient ) => 
                                            new FormGroup({'name' : new FormControl(ingredient.name,Validators.required), 'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])}))
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'imagePath'  : new FormControl(recipeImagePath,Validators.required),
      'ingredients' : new FormArray(ingredientsFormcontrolls,Validators.minLength(1))
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup(
      {'name' : new FormControl(null,Validators.required), 'amount' : new FormControl(null,[Validators.required,Validators.min(1)])}
      ));
  }

  onDeleteIngredient(i : number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(i);
  }

  onCancel(){
    this.router.navigate([""])
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.editRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate([""])
  }

  isValid(elementName : string){    
    if( this.recipeForm != null ) {
      const element = this.recipeForm.get(elementName); 
      return element.touched && !element.valid  ;
    }else 
    return true;
  } 

  get ingredientControlls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
