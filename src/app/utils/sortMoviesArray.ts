import { Countries } from "../ENUMS/countries";
import { Movie } from "../interfaces/Movie";
import { UserWatchedMoviesCount } from "../interfaces/User";

export const sortArr = (a: Movie, b: Movie) => {
  return b.watchedNumber.total - a.watchedNumber.total;
}

export const sortArrByCountries = (movies: Movie[], country: Countries) => {
  return movies.sort((a: Movie, b: Movie) => {
    return b.watchedNumber.countries[country] - a.watchedNumber.countries[country];
  });
}

export const sortUserMoviesCountArr = (a: UserWatchedMoviesCount, b: UserWatchedMoviesCount) => {
  return b.moviesWatchedCount - a.moviesWatchedCount;
}
