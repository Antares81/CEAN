import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipeModel, Dificultad } from './models/recipe.model';

@Component({
    selector: 'g-recipe',
    templateUrl: './recipes.component.html'
})
export class RecipesComponent {

    @Input() public receta: RecipeModel;

    @Output() public recetaHecha = new EventEmitter<boolean>();

    public recetaRealizada() {
        this.recetaHecha.emit(true);
    }
}
