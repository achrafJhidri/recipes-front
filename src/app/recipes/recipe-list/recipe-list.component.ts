import { Component } from '@angular/core';
import { Recipe } from '../Recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes : Recipe[] = [
    new Recipe("pancakes","Fluffy pancakes","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK62GSZlxhbBCTGP1ldw97wXC4qwa1o2QwbQ&usqp=CAU"),
    new Recipe("beghrir","beghrir mt9oub mziaan","https://static.wixstatic.com/media/94e2e7_8ce40d0ac7dd4c3889f6513b7047af63~mv2.jpg/v1/fill/w_640,h_424,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/94e2e7_8ce40d0ac7dd4c3889f6513b7047af63~mv2.jpg"),
]

}