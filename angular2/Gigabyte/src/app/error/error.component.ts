import { Component } from '@angular/core';

@Component({
    selector: 'g-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    public message: string;
    constructor() {
        this.message = 'No se encuentra el recurso';
    }
}
