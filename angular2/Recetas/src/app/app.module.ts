import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './start/app.component';
import { NavbarComponent } from './shared/navbar.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientsListComponent } from
    './ingredients/ingredients-list/ingredients-list.component';
import { RecipesService } from './recipes/services/recipes.service';

@NgModule({
    imports: [ BrowserModule,
                HttpModule ],
    declarations: [ AppComponent,
                    NavbarComponent,
                    RecipesComponent,
                    RecipesListComponent,
                    IngredientsComponent,
                    IngredientsListComponent ],
    providers: [ RecipesService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}
