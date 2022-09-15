import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/Movie';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  get getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('assets/database/movies.json');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User[]>('assets/database/users.json').pipe(
      map(users => {
        return users.find(user => user.id === userId) as User;
      })
    );
  }
}
