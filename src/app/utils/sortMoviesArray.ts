import { Countries } from "../enums/countries";
import { Metrics, Movie } from "../interfaces/Movie";
import { UserWatchedMoviesCount } from "../interfaces/User";

export const metricsSortArr = (a: Metrics, b: Metrics) => {
  return b.watchedNumber.total - a.watchedNumber.total;
}

export const sortMetricsArrByCountries = (metrics: Metrics[], country: Countries) => {
  return metrics.sort((a: Metrics, b: Metrics) => {
    return b.watchedNumber.countries[country] - a.watchedNumber.countries[country];
  });
}

export const sortUserMoviesCountArr = (a: UserWatchedMoviesCount, b: UserWatchedMoviesCount) => {
  return b.moviesWatchedCount - a.moviesWatchedCount;
}
