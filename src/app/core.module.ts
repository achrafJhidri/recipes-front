import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS} from '@angular/common/http';


import { ShoppingListService } from './shopping-list/shopping-List.service';
import { RecipeService } from '../app/recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        AuthService,
        {provide : HTTP_INTERCEPTORS,useClass : AuthInterceptorService,multi:true}],
})
export class CoreModule {

}