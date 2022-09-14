import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/Movie';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  get getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/database/movies.json');
  }
}
