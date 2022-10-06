import { TestBed } from '@angular/core/testing';
import { UserData } from '../interfaces/User';
import { NetflixService } from './netflix.service';
import { MetricsService } from './metrics.service';
import { of } from 'rxjs';
import { DbService } from './db.service';
import { UsersService } from './users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from './local-storage.service';

describe('NetflixService', () => {
  let service: NetflixService;
  let metricsService: MetricsService;
  let dbService: DbService;
  let userService: UsersService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(NetflixService);
    metricsService = TestBed.inject(MetricsService);
    dbService = TestBed.inject(DbService);
    userService = TestBed.inject(UsersService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(function () {
    localStorage.removeItem('Netflix_user');
    localStorage.removeItem('users');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getMoviesByCategory() -> Should return Obeservable Movie array', () => {
    const spyGetMoviesByCategory = spyOn(metricsService, 'getMoviesByCategory')
      .and.returnValue(of([]));

    service.getMoviesByCategory('Animation');

    expect(spyGetMoviesByCategory).toHaveBeenCalledWith('Animation');
  });

  it('(U) getCategoriesMovies() -> Should return Obeservable Movie List Categories array', () => {
    const spyGetCategoriesMoviesMetrics = spyOnProperty(metricsService, 'getCategoriesMovies', 'get');

    service.getCategoriesMovies;

    expect(spyGetCategoriesMoviesMetrics).toHaveBeenCalled();
  });

  it('(U) getTopMoviesGlobal() -> Should return Obeservable Movie array', () => {
    const spyGetTopMoviesGlobalMetrics = spyOnProperty(metricsService, 'getTopMoviesGlobal', 'get');

    service.getTopMoviesGlobal;

    expect(spyGetTopMoviesGlobalMetrics).toHaveBeenCalled();
  });

  it('(U) getTopMoviesPerCountry -> Should return Obeservable Top Movie per Country array', () => {
    const spyGetTopMoviesPerCountryMetrics = spyOnProperty(metricsService, 'getTopMoviesPerCountry', 'get');

    service.getTopMoviesPerCountry;

    expect(spyGetTopMoviesPerCountryMetrics).toHaveBeenCalled();
  });

  it('(U) updateMoviesWatched -> Should udpdated user actions', () => {
    const spyUpdatedMoviesWatched = spyOn(metricsService, 'updateMoviesWatchedMetrics')
      .and.returnValue(of([] as UserData[]));
    const spyUpdateMoviesMetricsLocalStorage = spyOn(localStorageService, 'updatedMoviesWatchedLocalStorage');

    service.updateMoviesWatched(1);

    expect(spyUpdatedMoviesWatched).toHaveBeenCalledWith(1);
    expect(spyUpdateMoviesMetricsLocalStorage).toHaveBeenCalled();
  });

  it('(U) getUserLogged -> Should return the user logged observable', () => {
    const spyGetUserLogged = spyOnProperty(userService, 'getUserLogged', 'get');

    service.getUserLogged;

    expect(spyGetUserLogged).toHaveBeenCalled();
  });

  it('(U) getMovieById -> Should return the movie correct observable', () => {
    const spyGetMovieById = spyOn(dbService, 'getMovieById');

    service.getMovieById(1);

    expect(spyGetMovieById).toHaveBeenCalledWith(1);
  });

  it('(U) getUsersMoreWatchedMovies -> Should return the user who more watched movies sorted observable', () => {
    const spyGetUsersMoreWatchedMoviesMetrics = spyOnProperty(metricsService, 'getUsersMoreWatchedMovies', 'get');

    service.getUsersMoreWatchedMovies;

    expect(spyGetUsersMoreWatchedMoviesMetrics).toHaveBeenCalledWith();
  });

  it('(U) topUsersMoreWatchMovies -> Should return top user more watched movie obervable', () => {
    const spyGetTopUsersMoreWatchMoviesMetrics = spyOnProperty(metricsService, 'topUsersMoreWatchMovies', 'get');

    service.topUsersMoreWatchMovies;

    expect(spyGetTopUsersMoreWatchMoviesMetrics).toHaveBeenCalledWith();
  });

  it('(U) getMoviesMoreWatchedByUser -> Should return movies more watched by user obervable', () => {
    const spyGetMoviesMoraWatchedByUser = spyOn(userService, 'getMoviesMoreWatchedByUser');

    service.getMoviesMoreWatchedByUser('user@email.com');

    expect(spyGetMoviesMoraWatchedByUser).toHaveBeenCalledWith('user@email.com');
  });

  it('(U) getMetricsById -> Should return movie metrics by movie id obervable', () => {
    const spyGetMetricsById = spyOn(metricsService, 'getMetricsById');

    service.getMetricsById(30);

    expect(spyGetMetricsById).toHaveBeenCalledWith(30);
  });
});
