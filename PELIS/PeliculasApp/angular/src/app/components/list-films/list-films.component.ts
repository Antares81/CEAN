import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Film } from "app/models/film";
import { FilmService } from "../../services/film.service";

@Component({
  selector: 'film-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  @Input() filteredFilms: Observable<Film[]>;
  private films: Observable<Film[]>;

  constructor(private filmService: FilmService) {   
  }

  ngOnInit() {
     this.films = this.filmService.getFilmsAsynHttp();    
  }

}
