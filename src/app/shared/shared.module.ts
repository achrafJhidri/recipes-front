import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

@NgModule({
    declarations : [
        DropdownDirective,
        LoadingSpinnerComponent,
        PageNotFoundComponent
    ],
    imports : [CommonModule],
    exports : [
        DropdownDirective,
        LoadingSpinnerComponent,
        PageNotFoundComponent,
        CommonModule
    ]
})
export class SharedModule{

}