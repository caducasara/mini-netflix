import { Countries } from "../enums/countries";

export interface Movie {
  id: number;
  title: string;
  folder: string;
  synopsi: string;
  year: string;
  category: string;
  trailer: string;
  watchedNumber: {
    total: number;
    countries: {
      [Countries.Brazil]: number;
      [Countries.USA]: number;
      [Countries.Argentina]: number;
    }
  }
}

export interface MoviesCategories {
  name: string;
  movies: Movie[];
}

export interface TopMoviesCountry {
  countryName: string;
  movies: Movie[];
}
