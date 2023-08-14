import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-List.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeService } from '../app/recipes/recipe.service';
import { AuthComponent } from './auth/auth.component'
import { AuthService } from './auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ShoppingModule,
    RecipesModule
  ],
  providers: [ShoppingListService,RecipeService,AuthService,{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
