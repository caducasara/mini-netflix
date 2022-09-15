import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/Movie';
import { User, UserData, UserMoviesWatched } from '../interfaces/User';
import { sortUserMoreMoviesWatchedArr } from '../utils/sortMoviesArray';

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

  getMoviesMoreWatchedByUser(userEmail: string): Observable<Movie[]>{
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string)
      : [];

    const user = users.find((user: UserData) => user.userEmail === userEmail);
    user.movies.sort(sortUserMoreMoviesWatchedArr);

    return this.getMovies.pipe(
      map(movies => {
        let moviesWatched: Movie[] = [];

        user.movies.forEach((userMovieWatched: UserMoviesWatched) => {
          movies.forEach(movie => {
            if(userMovieWatched.movieId === movie.id){
              moviesWatched.push(movie)
            }
          })
        })

        return moviesWatched;
      })
    );
  }
}
