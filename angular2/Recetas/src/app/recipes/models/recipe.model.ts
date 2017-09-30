import { IngredientModel } from '../../ingredients/models/ingredient.model';

export enum Dificultad { Baja, Media, Alta};
export class RecipeModel {
    public name: string;
    public preparacion: string;
    public imagen: string;
    public dificultad: Dificultad;
    public ingredientes: IngredientModel[];

    constructor(n: string, p: string, i: string, d: Dificultad, ingredientes: IngredientModel[]) {
        this.name = n;
        this.preparacion = p;
        this.imagen = i;
        this.dificultad = d;
        this.ingredientes = ingredientes;
    }
}
