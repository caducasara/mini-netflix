import { Countries } from "../ENUMS/countries";
import { Movie } from "../interfaces/Movie";

export const sortArr = (a: Movie, b: Movie) => {
  return b.watchedNumber.total - a.watchedNumber.total;
}

export const sortArrByCountries = (movies: Movie[], country: Countries) => {
  return movies.sort((a: Movie, b: Movie) => {
    return b.watchedNumber.countries[country] - a.watchedNumber.countries[country];
  });
}
