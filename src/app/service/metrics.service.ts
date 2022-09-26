import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Categories } from '../enums/categories';
import { Countries } from '../enums/countries';
import { Metrics, Movie, MoviesCategories, TopMoviesCountry } from '../interfaces/Movie';
import { User, UserData, UserMoviesWatched, UserWatchedMoviesCount } from '../interfaces/User';
import { metricsSortArr, sortMetricsArrByCountries, sortUserMoviesCountArr } from '../utils/sortMoviesArray';
import { DbService } from './db.service';
import { LocalStorageService } from './local-storage.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private localStorageService: LocalStorageService,
    private dbService: DbService
  ) { }

  get getMetrics(): Observable<Metrics[]> {
    return this.localStorageService.getLocalStorageMetrics;
  }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.dbService.getMovies.pipe(
      map(movies => {
        const moviesCategory: Movie[] = movies.filter(
          movie => movie.category === category
        );
        return moviesCategory;
      })
    );
  }

  get getCategoriesMovies(): Observable<MoviesCategories[]> {
    const metrics = this.getMetrics;
    let requestMoviesCategoriesResponse: Observable<Movie[]>[] = [];

    for (let category in Categories) {
      requestMoviesCategoriesResponse.push(this.getMoviesByCategory(category));
    }

    return forkJoin([metrics, ...requestMoviesCategoriesResponse]).pipe(
      map(([metricsResponse, ...moviesCategories]) => {
        let moviesData: MoviesCategories[] = [];

        for (let movies of moviesCategories) {
          const category = movies[0].category;
          const moviesMetrics = metricsResponse.filter(metric => {
            return movies.find(movie => movie.id === metric.movieId);
          });
          const orderMoviesMetrics = moviesMetrics.sort(metricsSortArr);
          let moviesSorted = [] as Movie[];

          orderMoviesMetrics.forEach(metric => {
            moviesSorted.push(movies.find(movie => movie.id === metric.movieId) as Movie);
          });

          moviesData = [...moviesData, { name: category, movies: [...moviesSorted] }]
        }

        return moviesData;
      })
    );
  }

  get getTopMoviesGlobal(): Observable<Movie[]> {
    const metrics = this.getMetrics;

    return this.dbService.getMovies.pipe(
      switchMap(movies => {
        return forkJoin([of(movies), metrics])
      }),
      map(([moviesResponse, metricsResponse]) => {
        const topMoviesGlobalMetricsSorted = metricsResponse.sort(metricsSortArr);
        const topMoviesGLobal = [] as Movie[];

        topMoviesGlobalMetricsSorted.forEach((metric: Metrics) => {
          topMoviesGLobal.push(moviesResponse.find(
            (movie: Movie) => movie.id === metric.movieId
          ) as Movie);
        });

        return topMoviesGLobal;
      })
    );
  }

  get getTopMoviesPerCountry(): Observable<TopMoviesCountry[]> {
    return this.dbService.getMovies.pipe(
      switchMap(movies => {
        return forkJoin([of(movies), this.getMetrics]);
      }),
      map(([movies, metrics]) => {
        const topMoviesMetricsSorted = metrics.sort(metricsSortArr);
        let topMoviesPerCountry: TopMoviesCountry[] = [];

        for (let country in Countries) {
          const metricsSorted = sortMetricsArrByCountries(topMoviesMetricsSorted, country as Countries);
          const moviesSorted = [] as Movie[];

          metricsSorted.forEach(metric => {
            moviesSorted.push(movies.find((movie: Movie) => movie.id === metric.movieId) as Movie);
          });

          topMoviesPerCountry.push({ countryName: country, movies: [...moviesSorted] })
        }

        return topMoviesPerCountry;
      })
    );
  }


  updatedMetrics(movieId: Number, userEmail: string): Observable<Metrics[]> {
    return this.getMetrics.pipe(
      switchMap(metrics => {
        return forkJoin([of(metrics), this.userService.getUsers])
      }),
      map(([metricsParams, usersParams]) => {

        let metrics = metricsParams;
        const users = usersParams;
        const { country } = users.find(user => user.email === userEmail) as User;
        const metricsIndex = metrics.findIndex((metric: Metrics) => metric.movieId === movieId);

        if (metricsIndex !== -1) {
          metrics[metricsIndex].watchedNumber.total += 1;
          metrics[metricsIndex].watchedNumber.countries[country] += 1;
        }

        return metrics;
      })
    );
  }

  updateMoviesWatchedMetrics(movieId: number): Observable<UserData[]> {
    return this.localStorageService.getUserLoggedLocalStorage.pipe(
      switchMap(user => {
        return forkJoin([of(user), this.localStorageService.getUsersLocalStorage]);
      }),
      map(([userLocalStorage, usersLocalStorage]) => {
        const { email } = userLocalStorage;
        let usersDataLocalStorage: UserData[] = this.localStorageService
        .verifyHasUserInLocalStorage(email, usersLocalStorage);

        const userIndex = usersDataLocalStorage
          .findIndex((user: UserData) => user.userEmail === email);
        const movieIndex = usersDataLocalStorage[userIndex].movies
          .findIndex((movie: UserMoviesWatched) => movie.movieId === movieId);

        if (movieIndex === -1) {
          usersDataLocalStorage[userIndex].movies.push({ movieId, views: 1 });
        } else {
          usersDataLocalStorage[userIndex].movies[movieIndex].views++;
        }

        this.updatedMetrics(movieId, email).subscribe(
          newMetrics =>
            this.localStorageService.updateLocalStorageMetrics(newMetrics)
        );

        return usersDataLocalStorage;
      })
    );
  }

  get getUsersMoreWatchedMovies(): Observable<UserWatchedMoviesCount[]> {
    return this.localStorageService.getUsersLocalStorage.pipe(
      map(users => {
        const userMoviesWatchedCount = users.map((user: UserData) => {
          const totalMoviesWatchedCount = user.movies
            .reduce((acc, act) => acc + act.views, 0);

          return {
            userEmail: user.userEmail,
            moviesWatchedCount: totalMoviesWatchedCount
          }
        })

        const sortUserMoviesWatchedCount = userMoviesWatchedCount
          .sort(sortUserMoviesCountArr);
        return sortUserMoviesWatchedCount;
      })
    );
  }

  get topUsersMoreWatchMovies(): Observable<User[]> {
    return this.getUsersMoreWatchedMovies.pipe(
      switchMap(usersMoreWatchedMovies => {
        return forkJoin([of(usersMoreWatchedMovies), this.userService.getUsers])
      }),
      map(([usersMoreWatchedMovies, users]) => {
        const usersFormated = usersMoreWatchedMovies.map(user => {
          const findUser = users.find(userMocked => userMocked.email === user.userEmail);

          return findUser as User;
        }).slice(0, 3);

        return usersFormated;
      })
    );
  }

  getMetricsById(movieId: number): Observable<number> {
    return this.getMetrics.pipe(
      map(metricsData => {
        const metrics = metricsData
          .find((metrics: Metrics) => metrics.movieId === movieId) as Metrics;
        const watchedNumber = metrics.watchedNumber.total;
        return watchedNumber;
      })
    );
  }
}
