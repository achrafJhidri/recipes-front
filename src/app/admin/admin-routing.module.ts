import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes : Routes = [{
    path : "" , component : AdminComponent
}]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class AdminRoutingModule{
    
}