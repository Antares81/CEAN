import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { RecipesService } from '../services/recipes.service';
import { RecipeModel, Dificultad } from '../models/recipe.model';
import { IngredientModel } from '../../ingredients/models/ingredient.model';

@Component({
    selector: 'g-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
    // public recipes: RecipeModel[];
    public recipes: Observable<RecipeModel[]>;
    public subscription: Subscription;
    public mensaje: string;

    constructor(private recipesService: RecipesService) {
        // this.recipes = recipesService.getRecipes();
        /*recipesService.getRecetasAsync().subscribe((data: RecipeModel[]) => {
            this.recipes = data;
        });*/
        this.recipes = recipesService.getRecetasAsync();
        /*this.subscription = recipesService.recipesChanged
            .subscribe((recipes: RecipeModel[]) => {
                this.recipes = recipes;
            });*/
    }

    public addRecipe() {
        let recipe = new RecipeModel(
            'Arróz con bogavante',
            'Cocinar arroz con bogavante',
            '',
            Dificultad.Alta, [
                new IngredientModel('Arroz', 2),
                new IngredientModel('Bogavante', 100)
        ]);

        this.recipesService.addRecipe(recipe);
    }

    public logReceta(receta: any) {
        this.mensaje = `La receta "${receta.name}" se ha realizado correctamente`;
    }
}
