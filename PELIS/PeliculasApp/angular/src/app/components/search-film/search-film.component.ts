import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { FilmService } from "app/services/film.service";
import { Film } from "app/models/film";

@Component({
  selector: 'film-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.css']
})
export class SearchFilmComponent implements OnInit {

  name: string
  films: Observable<Film[]>

  constructor(private filmService: FilmService) { }

  findFilmByName (): Observable<Film[]> {
    this.films = this.filmService.getFilmsByName(this.name)
    return this.films
  }
  
  ngOnInit() {
  }

}
