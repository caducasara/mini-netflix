import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Movie } from '../interfaces/Movie';
import { User, UserData, UserMoviesWatched } from '../interfaces/User';
import { sortUserMoreMoviesWatchedArr } from '../utils/sortMoviesArray';
import { DbService } from './db.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private dbService: DbService
  ) { }

  get getUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/database/users.json');
  }

  get getUserLogged(): Observable<User> {
    return this.getUsers.pipe(
      map(users => {
        const { email } = JSON.parse(localStorage.getItem('Netflix_user') as string);
        const user = users.find(user => user.email === email) as User;

        return user;
      })
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User[]>('assets/database/users.json').pipe(
      map(users => {
        return users.find(user => user.id === userId) as User;
      })
    );
  }

  getMoviesMoreWatchedByUser(userEmail: string): Observable<Movie[]>{
    return this.localStorageService.getUsersLocalStorage.pipe(
      switchMap(users => {
        const user = users.find((user: UserData) => user.userEmail === userEmail);
        return forkJoin([of(user), this.dbService.getMovies]);
      }),
      map(([user, movies]) => {
        let moviesWatched: Movie[] = [];

        if (user) {
          user.movies.sort(sortUserMoreMoviesWatchedArr);

          user.movies.forEach((userMovieWatched: UserMoviesWatched) => {
            movies.forEach(movie => {
              if (userMovieWatched.movieId === movie.id) {
                moviesWatched.push(movie)
              }
            })
          })
        }

        return moviesWatched;
      })
    );
  }
}
