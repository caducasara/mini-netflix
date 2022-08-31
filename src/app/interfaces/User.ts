import { Countries } from "../ENUMS/countries";

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  password?: string;
  token?: string;
  country: Countries;
}

export interface UserSingIn {
  email: string;
  password: string;
}

export interface UserData {
  userEmail: string;
  movies: UserMoviesWatched[];
}

export interface UserMoviesWatched {
  movieId: number;
  views: number;
}

export interface UserWatchedMoviesCount {
  userEmail: string;
  moviesWatchedCount: number;
}
