import { Component } from '@angular/core';

@Component({
    selector: 'g-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public saludo: string = 'Hola Santiago!';
    constructor() {
        this.saludo = 'Hola Coruña!';
    }
}
