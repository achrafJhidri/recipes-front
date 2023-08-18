import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations : [ AdminComponent],
    imports : [SharedModule,AdminRoutingModule,FormsModule],
})
export class AdminModule{

}