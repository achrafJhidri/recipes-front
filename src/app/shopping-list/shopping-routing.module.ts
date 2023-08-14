import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "../auth-gard.guard";
import { ShoppingListComponent } from "./shopping-list.component";


const routes: Routes = [
    {path:"shopping",
     canActivate : [authGuard] , 
     component : ShoppingListComponent , 
     canDeactivate : [(component : ShoppingListComponent) => component.canDeactivate()]}
  ];

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class ShoppingRoutingModule {

}