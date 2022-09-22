import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/Movie';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private http: HttpClient
    ) { }

  get getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/database/movies.json');
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.getMovies.pipe(
      map(movies => {
        const findMovie = movies.find(movie => movie.id === movieId) as Movie;

        return findMovie;
      })
    );
  }
}
