import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film, Format } from "app/models/film";
import { FilmService } from "app/services/film.service";

@Component({
  selector: 'film-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  public name: string
  public genre: string
  public digital: boolean = false
  public dvd: boolean = false
  public bluray: boolean = false

  constructor(private filmService: FilmService, private router: Router) { }

  saveFilm() {
    let film = new Film(this.name, this.genre, new Format(this.digital, this.dvd, this.bluray))
    this.filmService.addFilm(film).subscribe((data) => {
      setTimeout(() => {
        this.router.navigateByUrl('search')
      }, 500);
    });
  }

  ngOnInit() {
  }

}
