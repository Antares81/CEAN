import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFilmComponent } from './components/search-film/search-film.component'
import { AddFilmComponent } from './components/add-film/add-film.component'
import { HomeComponent } from "app/components/home/home.component";

const routes: Routes = [
  {
    path: 'search',
    component: SearchFilmComponent
  },
  {
    path: 'add',
    component: AddFilmComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
