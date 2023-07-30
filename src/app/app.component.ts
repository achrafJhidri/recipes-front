import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shoppingApp';
  public route : String = "recipe" ; 

  selectRoute(route : String){
    this.route=route; 
  }
}
