import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ShoppingRoutingModule
    ]
})
export class ShoppingModule {

}