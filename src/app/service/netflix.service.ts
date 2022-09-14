import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { getMetrics } from '../database/Metrics';
import { getUsers } from '../database/Users';
import { Categories } from '../enums/categories';
import { Countries } from '../enums/countries';
import { Metrics, Movie, MoviesCategories, TopMoviesCountry } from '../interfaces/Movie';
import { User, UserData, UserMoviesWatched, UserWatchedMoviesCount } from '../interfaces/User';
import { metricsSortArr, sortMetricsArrByCountries, sortUserMoviesCountArr } from '../utils/sortMoviesArray';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NetflixService {

  constructor(private dbService: DbService) { }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.dbService.getMovies.pipe(
      map(movies => {
        const moviesCategory: Movie[] = movies.filter(movie => movie.category === category);
        return moviesCategory;
      })
    );
  }

  get getCategoriesMovies(): Observable<MoviesCategories[]> {

    const metrics: Metrics[] = this.getMetrics();
    let requestMoviesCategoriesResponse: Observable<Movie[]>[] = [];

    for (let category in Categories) {
      requestMoviesCategoriesResponse.push(this.getMoviesByCategory(category));
    }

    return forkJoin(requestMoviesCategoriesResponse).pipe(
      map(moviesCategories => {
        let moviesData: MoviesCategories[] = [];

        for (let movies of moviesCategories) {
          const category = movies[0].category;
          const moviesMetrics = metrics.filter(metric => {
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
    const metrics: Metrics[] = this.getMetrics();
    return this.dbService.getMovies.pipe(
      map(movies => {
        const topMoviesGlobalMetricsSorted = metrics.sort(metricsSortArr);
        const topMoviesGLobal = [] as Movie[];

        topMoviesGlobalMetricsSorted.forEach(metric => {
          topMoviesGLobal.push(movies.find(movie => movie.id === metric.movieId) as Movie);
        });

        return topMoviesGLobal;
      })
    );

  }

  get getTopMoviesPerCountry(): Observable<TopMoviesCountry[]> {
    const metrics: Metrics[] = this.getMetrics();

    return this.dbService.getMovies.pipe(
      map(movies => {
        const topMoviesMetricsSorted = metrics.sort(metricsSortArr);
        let topMoviesPerCountry: TopMoviesCountry[] = [];

        for (let country in Countries) {
          const metricsSorted = sortMetricsArrByCountries(topMoviesMetricsSorted, country as Countries);
          const moviesSorted = [] as Movie[];

          metricsSorted.forEach(metric => {
            moviesSorted.push(movies.find(movie => movie.id === metric.movieId) as Movie);
          });

          topMoviesPerCountry.push({ countryName: country, movies: [...moviesSorted] })
        }

        return topMoviesPerCountry;
      })
    );
  }

  updateMoviesWatched(movieId: number) {
    const { email } = JSON.parse(localStorage.getItem('Netflix_user') as string);
    let usersData = JSON.parse(localStorage.getItem('users') as string);

    if (!usersData) usersData = [];

    const hasUser = usersData.find((user: UserData) => user.userEmail === email);

    if (!hasUser) {
      const userFormated = {
        userEmail: email,
        movies: []
      }

      usersData.push(userFormated);
      localStorage.setItem('users', JSON.stringify(usersData));
    }

    const userIndex = usersData
      .findIndex((user: UserData) => user.userEmail === email);
    const movieIndex = usersData[userIndex].movies
      .findIndex((movie: UserMoviesWatched) => movie.movieId === movieId);

    if (movieIndex === -1) {
      usersData[userIndex].movies.push({ movieId, views: 1 });
    } else {
      usersData[userIndex].movies[movieIndex].views++;
    }

    this.updatedMetrics(movieId, email);

    localStorage.setItem('users', JSON.stringify(usersData));
  }

  getUserLogged(): User {
    const users = getUsers();
    const { email } = JSON.parse(localStorage.getItem('Netflix_user') as string);
    const user = users.find(user => user.email === email) as User;

    return user;
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.dbService.getMovies.pipe(
      map(movies => {
        const findMovie = movies.find(movie => movie.id === movieId) as Movie;

        return findMovie;
      })
    );
  }

  get getUsersMoreWatchedMovies(): Observable<UserWatchedMoviesCount[]> {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string) : [];

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

    return of(sortUserMoviesWatchedCount);
  }

  get topUsersMoreWatchMovies(): Observable<User[]>{
    return this.getUsersMoreWatchedMovies.pipe(
      map(users => {
        const usersMock = getUsers();
        const usersFormated = users.map(user => {
          const findUser = usersMock.find(userMocked => userMocked.email === user.userEmail);

          return findUser as User;
        }).slice(0, 3);

        return usersFormated;
      })
    );
  }

  getMetrics() {
    const hasMetrics = localStorage.getItem('metrics');

    if (!hasMetrics) {
      localStorage.setItem('metrics', JSON.stringify(getMetrics()));

      return getMetrics();
    }

    return JSON.parse(hasMetrics);
  }

  updatedMetrics(movieId: Number, userEmail: string) {
    let metrics = this.getMetrics();
    const users = getUsers();
    const { country } = users.find(user => user.email === userEmail) as User;
    const metricsIndex = metrics.findIndex((metric: Metrics) => metric.movieId === movieId);

    if (metricsIndex !== -1) {
      metrics[metricsIndex].watchedNumber.total += 1;
      metrics[metricsIndex].watchedNumber.countries[country] += 1;
    }

    localStorage.setItem('metrics', JSON.stringify(metrics));
  }

  getMetricsById(movieId: number): number {
    const metrics = this.getMetrics()
      .find((metrics: Metrics) => metrics.movieId === movieId);
    const watchedNumber = metrics.watchedNumber.total;
    return watchedNumber;
  }
}
