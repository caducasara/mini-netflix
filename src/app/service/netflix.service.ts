import { Injectable } from '@angular/core';
import { getMovies } from '../database/Movies';
import { getUsers } from '../database/Users';
import { Categories } from '../ENUMS/categories';
import { Movie, MoviesCategories } from '../interfaces/Movie';
import { User, UserData } from '../interfaces/User';
import { sortArr } from '../utils/sortMoviesArray';

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
}
