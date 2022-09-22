import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MoviesCategories, TopMoviesCountry } from '../interfaces/Movie';
import { User, UserWatchedMoviesCount } from '../interfaces/User';
import { DbService } from './db.service';
import { LocalStorageService } from './local-storage.service';
import { MetricsService } from './metrics.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class NetflixService {

  constructor(
    private dbService: DbService,
    private metricsService: MetricsService,
    private localStorageService: LocalStorageService,
    private userService: UsersService
  ) { }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.metricsService.getMoviesByCategory(category);
  }

  get getCategoriesMovies(): Observable<MoviesCategories[]> {
    return this.metricsService.getCategoriesMovies;
  }

  get getTopMoviesGlobal(): Observable<Movie[]> {
    return this.metricsService.getTopMoviesGlobal;
  }

  get getTopMoviesPerCountry(): Observable<TopMoviesCountry[]> {
    return this.metricsService.getTopMoviesPerCountry;
  }

  updateMoviesWatched(movieId: number) {
    this.metricsService.updateMoviesWatchedMetrics(movieId).subscribe(
      newMoviesWatchedMetrics => {
        this.localStorageService.updatedMoviesWatchedLocalStorage(newMoviesWatchedMetrics);
      }
    );
  }

  get getUserLogged(): Observable<User> {
    return this.userService.getUserLogged
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.dbService.getMovieById(movieId);
  }

  get getUsersMoreWatchedMovies(): Observable<UserWatchedMoviesCount[]> {
    return this.metricsService.getUsersMoreWatchedMovies;
  }

  get topUsersMoreWatchMovies(): Observable<User[]> {
    return this.metricsService.topUsersMoreWatchMovies;
  }

  getMoviesMoreWatchedByUser(userEmail: string): Observable<Movie[]> {
    return this.userService.getMoviesMoreWatchedByUser(userEmail);
  }

  getMetricsById(movieId: number): Observable<number> {
    return this.metricsService.getMetricsById(movieId);
  }
}
