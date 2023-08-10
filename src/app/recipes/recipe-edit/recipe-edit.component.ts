import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/Ingredient';
import { isValid } from 'src/app/utils/utils';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  recipeForm : FormGroup;
  editMode : boolean = false ;
  id : number  = null;
  isLoading : boolean = true;
  errorMsg : string = null;
  constructor(private route : ActivatedRoute,private router : Router,  private recipeService : RecipeService){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.id  = params["id"];
        this.editMode = this.id != null;
        this.initForm();
    })
  }

  private initForm(){
    let recipeName : String= ''
    let recipeImagePath : String = ''
    let recipeDescription : String = ''
    let ingredientsFormcontrolls : FormGroup[] = [] ; 

    if(this.editMode){
      this.recipeService.getRecipieWithIndex(this.id).subscribe((recipe) => {
        this.isLoading = false;
        recipeName = recipe.name;
        recipeImagePath =recipe.imagePath;
        recipeDescription = recipe.description;
        ingredientsFormcontrolls  =  recipe.ingredients
                                          .map((ingredient : Ingredient ) => new FormGroup({
                                              'name' : new FormControl(ingredient.name,Validators.required), 
                                              'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])
                                            }))                                            
        //not duplicate 
        //TODO find how to force rendering at this time so it uses the new values                                   
        this.recipeForm = this.initFormWithValues(recipeName,recipeDescription,recipeImagePath,ingredientsFormcontrolls)                        
        },
        error => {
          this.errorMsg = error.msg
          this.isLoading = false; 
        });;     
    }else {
      this.isLoading = false;
      this.errorMsg = null;
      this.recipeForm = this.initFormWithValues(recipeName,recipeDescription,recipeImagePath,ingredientsFormcontrolls)
    }
  }

  private initFormWithValues(recipeName,recipeDescription,recipeImagePath,ingredientsFormcontrolls){
    return new FormGroup({
      'name' : new FormControl(recipeName,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'imagePath'  : new FormControl(recipeImagePath,Validators.required),
      'ingredients' : new FormArray(ingredientsFormcontrolls,Validators.minLength(1))
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
        'name' : new FormControl(null,Validators.required), 
      'amount' : new FormControl(null,[Validators.required,Validators.min(1)])}));
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
      return isValid(this.recipeForm,elementName);
  } 

  get ingredientControlls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
