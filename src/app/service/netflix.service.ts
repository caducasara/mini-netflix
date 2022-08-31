import { Injectable } from '@angular/core';
import { getMovies } from '../database/Movies';
import { getUsers } from '../database/Users';
import { Categories } from '../ENUMS/categories';
import { Countries } from '../ENUMS/countries';
import { Movie, MoviesCategories, TopMoviesCountry } from '../interfaces/Movie';
import { User, UserData, UserMoviesWatched, UserWatchedMoviesCount } from '../interfaces/User';
import { sortArr, sortArrByCountries, sortUserMoviesCountArr } from '../utils/sortMoviesArray';

@Injectable({
  providedIn: 'root'
})
export class NetflixService {

  constructor() { }

  getMoviesByCategory(category: string) {
    const movies = getMovies();
    const moviesCategory: Movie[] = movies.filter(movie => movie.category === category);
    const moviesOrder = moviesCategory.sort(sortArr);

    return moviesOrder;
  }

  getCategoriesMovies(): MoviesCategories[] {

    let movieData: MoviesCategories[] = [];

    for (let category in Categories) {
      const movies = this.getMoviesByCategory(category);
      const moviesSort = this.getMoviesSort(movies);
      const moviesSorted = moviesSort.sort(sortArr)
      movieData = [...movieData, { name: category, movies: [...moviesSorted] }]
    }

    return movieData;
  }

  getMoviesSort(movies: Movie[]) {
    const usersData = getUsers();
    const users: UserData[] = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string) : [];

    users.forEach(user => {
     const { country } = usersData.find(userList => userList.email === user.userEmail) as User;

      user.movies.forEach(movie => {
        const movieIndex = movies.findIndex(movieList => movieList.id === movie.movieId);

        if(movieIndex !== -1){
          movies[movieIndex].watchedNumber.total += movie.views;
          movies[movieIndex].watchedNumber.countries[country] += movie.views;
        }
      });
    });

    return movies;
  }

  getTopMoviesGlobal() {
    const movies = getMovies();
    const moviesSort = this.getMoviesSort(movies);
    const topGlobal = moviesSort.sort(sortArr)

    return topGlobal;
  }

  getTopMoviesPerCountry() {
    const movies = getMovies();
    const moviesSort = this.getMoviesSort(movies);
    let topMoviesPerCountry: TopMoviesCountry[] = [];

    for (let country in Countries) {
      const moviesSorted = sortArrByCountries(moviesSort, country as Countries);
      topMoviesPerCountry.push({ countryName: country, movies: [...moviesSorted] })
    }

    return topMoviesPerCountry;
  }

  updateMoviesWatched(movieId: number) {
    const { email } = JSON.parse(localStorage.getItem('Netflix_user') as string);
    let usersData = JSON.parse(localStorage.getItem('users') as string);

    if (!usersData) usersData = [];

    const hasUser = usersData.find((user: UserData) => user.userEmail === email);

    if (!hasUser) {
      const userFormated = {
        userEmail:  email,
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

    localStorage.setItem('users', JSON.stringify(usersData));
  }

  getUserLogged(): User{
    const users = getUsers();
    const { email } = JSON.parse(localStorage.getItem('Netflix_user') as string);
    const user = users.find(user => user.email === email) as User;

    return user;
  }

  getMovieById(movieId: number): Movie{
    const movies = getMovies();
    const findMovie = movies.find(movie => movie.id === movieId) as Movie;

    return findMovie;
  }

  getUsersMoreWatchedMovies(): UserWatchedMoviesCount[] {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string) : [];

    const userMoviesWatchedCount = users.map((user: UserData) => {
      return {
        userEmail: user.userEmail,
        moviesWatchedCount: user.movies.length
      }
    })

    const sortUserMoviesWatchedCount = userMoviesWatchedCount
      .sort(sortUserMoviesCountArr);

    return sortUserMoviesWatchedCount;
  }

}
