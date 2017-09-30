import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { RecipeModel, Dificultad } from '../models/recipe.model';
import { IngredientModel } from '../../ingredients/models/ingredient.model';

@Injectable()
export class RecipesService {
    public recipes: RecipeModel[];
    public recipesChanged = new Subject<RecipeModel[]>();
    private baseURL = 'http://localhost:8080';
    constructor(private http: Http) {
        /*
        this.recipes = [
            new RecipeModel('Hojaldre al limón',
                'Cocinar masa de hojaldre',
                '',
                Dificultad.Baja,
                [ new IngredientModel('Hojaldre', 10),
                    new IngredientModel('Limón', 8)]
                ),
            new RecipeModel('Pizza con grelos',
                'Cocinar pizza con grelos',
                '',
                Dificultad.Media,
                [ new IngredientModel('Pizza', 10),
                    new IngredientModel('Grelos', 3)]
                ),
            new RecipeModel('Pizza con pulpo',
                'Cocinar pizza con pulpo',
                '',
                Dificultad.Media,
                [ new IngredientModel('Pizza', 10),
                    new IngredientModel('Pulpo', 21)]
                )
        ];
        */
    }

/*
    public getRecipes():RecipeModel[] {
        return this.recipes;
    }
*/

/*
    public getRecetasAsync(): Observable<RecipeModel[]> {
        return new Observable((observer) => {
            observer.next(this.recipes);
        });
    }
*/

    public getRecetasAsync(): Observable<RecipeModel[]> {
        return this.http.get(`${this.baseURL}/getRecipes`)
            .map((res: Response) => {
                return this.recipes = res.json();
            });
    }

    public addRecipe(recipe: RecipeModel) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        /*return this.http.post(`${this.baseURL}/addRecipe`, recipe);*/
    }
}
