import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { Film, Format } from '../models/film'

@Injectable()
export class FilmService {

  baseUrl: string = 'http://localhost:3000'

  private films: Array<Film> = [
    new Film('IT', 'Terror', new Format(true, false, false))
  ]

  constructor(private http: Http) { }

  getFilmsAsynHttp(): Observable<Array<Film>> {
    return this.http.get(`${this.baseUrl}/films`).map(
      (res: Response) => {
        return <Array<Film>>res.json();
      })
  }

  getFilmsByName(name: string): Observable<Array<Film>> {
    return this.http.get(`${this.baseUrl}/films/${name}`).map(
      (res: Response) => {
        return <Array<Film>>res.json();
      })
  }

  addFilm(film: Film): Observable<Film> {
    let bodyString = JSON.stringify(film);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/films`, bodyString, {
      headers: headers
    })
      .map((res: Response) => {
        return res.json();
      })
  }

}
