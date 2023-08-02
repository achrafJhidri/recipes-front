import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  title : String ;

  constructor(private route : ActivatedRoute){

  }
  
  
  ngOnInit(): void {
       this.route.params.subscribe((params) => {
        const id  = params["id"];
      if(id){
        this.title = "edit mode of recipe number :"+id;
      }else {
        this.title = "new recipe please !"
      }})
  }

}
