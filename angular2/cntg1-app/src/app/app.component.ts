import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curso cean en cntg!';

  salario: number = 120.67;

  cumple: Date = new Date();
}
