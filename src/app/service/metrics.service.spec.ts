import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { getMetrics } from '../tests/mocks/Metrics';
import { getMovies } from '../tests/mocks/Movies';
import { getMoviesByCategory } from '../tests/mocks/moviesByCategory';
import { getUsers, getUsersMoreWatchedMovies } from '../tests/mocks/Users';
import { getUsersDataInLocalStorage, getUserSignIn } from '../tests/mocks/UsersDataLocalStorage';
import { metricsSortArr } from '../utils/sortMoviesArray';
import { DbService } from './db.service';
import { LocalStorageService } from './local-storage.service';

import { MetricsService } from './metrics.service';
import { UsersService } from './users.service';

describe('MetricsService', () => {
  let service: MetricsService;
  let localStorageService: LocalStorageService;
  let dbService: DbService;
  let usersService: UsersService;

  const metricsMock = getMetrics();
  const moviesMock = getMovies();
  const moviesCategoryMock = getMoviesByCategory();
  const usersDataMock = getUsersDataInLocalStorage();
  const usersMock = getUsers();
  const userLogedMock = getUserSignIn();
  const topUsersMoreWatchedMoviesMock = getUsersMoreWatchedMovies();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MetricsService);
    localStorageService = TestBed.inject(LocalStorageService);
    dbService = TestBed.inject(DbService);
    usersService = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getMetrics -> Should return metrics observable correctly', done => {
    spyOnProperty(localStorageService, 'getLocalStorageMetrics', 'get')
    .and.returnValue(of(metricsMock));

    const metrics = service.getMetrics;

    metrics.subscribe(
      metrics => {
        for(let i = 0; i < metrics.length; i++){
          expect(metrics[i].movieId).toEqual(metricsMock[i].movieId);
          expect(metrics[i].watchedNumber).toEqual(metricsMock[i].watchedNumber);
        }

        done();
      }
    );
  });

  it('(U) getMoviesByCategory -> Should return movies per category observable', done => {
    spyOnProperty(dbService, 'getMovies', 'get')
    .and.returnValue(of(moviesMock));

     const moviesCategoryAction = service.getMoviesByCategory('Action');

     moviesCategoryAction.subscribe(
      movies => {
        const isCategoriesEquals = movies.every(movies => movies.category === 'Action');

        expect(isCategoriesEquals).toBeTruthy();
        done();
      }
     );
  });

  it('(U) getCategoriesMovies -> Should return Metrics Categories Movies Observable', done => {
    const spyGetMetrics = spyOnProperty(service, 'getMetrics', 'get')
    .and.returnValue(of(metricsMock));
    const spyGetMoviesCategories = spyOn(service, 'getMoviesByCategory').and.returnValue(of(moviesCategoryMock))

    const moviesListSortedByCategory = service.getCategoriesMovies;

    moviesListSortedByCategory.subscribe(
      moviesCategories => {
         moviesCategories.forEach(moviesByCategory => {
          expect(moviesByCategory.name).toEqual('Animation');
         });
         done();
      }
    );


    expect(spyGetMetrics).toHaveBeenCalled();
    expect(spyGetMoviesCategories).toHaveBeenCalled();
  });

  it('(U) getTopMoviesGlobal -> Should return Metrics Categories Movies Observable', done => {
    const spyGetMetrics = spyOnProperty(service, 'getMetrics', 'get')
    .and.returnValue(of(metricsMock));
    const spyGetMovies = spyOnProperty(dbService, 'getMovies', 'get')
    .and.returnValue(of(moviesMock));

    service.getTopMoviesGlobal.subscribe(
      topMoviesGlobal => {
        const moviesSorted = metricsMock.sort(metricsSortArr);

        topMoviesGlobal.forEach((movie, index) => {
          expect(movie.id).toEqual(moviesSorted[index].movieId);
        });

        done();
      }
    );

    expect(spyGetMetrics).toHaveBeenCalled();
    expect(spyGetMovies).toHaveBeenCalled();

  });

  it('(U) getTopMoviesPerCountry -> Should return top movies per country observable', done => {
    const spyGetMovies = spyOnProperty(dbService, 'getMovies', 'get')
    .and.returnValue(of(moviesMock));
    const spyGetMetrics = spyOnProperty(service, 'getMetrics', 'get')
    .and.returnValue(of(metricsMock));
    const topMoviesPerCountry = service.getTopMoviesPerCountry;

    topMoviesPerCountry.subscribe(
      topMoviesPerCountry => {
        expect(topMoviesPerCountry.length).toEqual(3);

        done();
      }
    );

    expect(spyGetMovies).toHaveBeenCalled();
    expect(spyGetMetrics).toHaveBeenCalled();
  });

  it('(U) updatedMetrics ->  Should updated Metrics', done => {
    const spyGetMetrics = spyOnProperty(service, 'getMetrics', 'get')
    .and.returnValue(of(metricsMock));
    const spyGetUsers = spyOnProperty(usersService, 'getUsers', 'get')
    .and.returnValue(of(usersMock));

    const updatedMetrics = service.updatedMetrics(1, 'user1@teste.com');

    updatedMetrics.subscribe(
      metrics => {
        const findMetricsUpdated = metrics
        .find(metricsUpdated => metricsUpdated.movieId === 1);

        expect(findMetricsUpdated).toBeTruthy();
        expect(findMetricsUpdated?.watchedNumber.total).toEqual(21);
        expect(findMetricsUpdated?.watchedNumber.countries.Brazil).toEqual(11);

        done();
      }
    );

    expect(spyGetMetrics).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('(U) updateMoviesWatchedMetrics ->  Should updated user movies watched metrics when user data exists', done => {
    const spyGetUserLogged = spyOnProperty(localStorageService, 'getUserLoggedLocalStorage', 'get')
    .and.returnValue(of(userLogedMock));
    const spyGetUsers = spyOnProperty(localStorageService, 'getUsersLocalStorage', 'get')
    .and.returnValue(of(usersDataMock));

    const updatedUserMoviesWatched = service.updateMoviesWatchedMetrics(1);

    updatedUserMoviesWatched.subscribe(
      usersMoviesWatched => {
        const getMovieUserMovieWatched = usersMoviesWatched
        .find(data => data.userEmail === userLogedMock.email);
        const findMovieUpdated = getMovieUserMovieWatched?.movies
        .find(movie => movie.movieId === 1);

        expect(getMovieUserMovieWatched).toBeTruthy();
        expect(findMovieUpdated?.views).toBeTruthy();
        expect(findMovieUpdated?.views).toEqual(3);

        done();
      }
    );

    expect(spyGetUserLogged).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('(U) updateMoviesWatchedMetrics ->  Should updated user movies watched metrics when user data not exists', done => {
    const userLoggedMockTest = { email: 'user3@teste.com', password: 'teste3' };
    const spyGetUserLogged = spyOnProperty(localStorageService, 'getUserLoggedLocalStorage', 'get')
    .and.returnValue(of(userLoggedMockTest));
    const spyGetUsers = spyOnProperty(localStorageService, 'getUsersLocalStorage', 'get')
    .and.returnValue(of(usersDataMock));

    const updatedUserMoviesWatched = service.updateMoviesWatchedMetrics(1);

    updatedUserMoviesWatched.subscribe(
      usersMoviesWatched => {
        const getMovieUserMovieWatched = usersMoviesWatched
        .find(data => data.userEmail === userLoggedMockTest.email);
        const findMovieUpdated = getMovieUserMovieWatched?.movies
        .find(movie => movie.movieId === 1);

        expect(getMovieUserMovieWatched).toBeTruthy();
        expect(findMovieUpdated?.views).toBeTruthy();
        expect(findMovieUpdated?.views).toEqual(1);

        done();
      }
    );

    expect(spyGetUserLogged).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('(U) getUsersMoreWatchedMovies -> Should return top users More Warched Movies metrics', done => {
    const spyGetUsersLocalStorage = spyOnProperty(localStorageService, 'getUsersLocalStorage', 'get')
    .and.returnValue(of(usersDataMock));

    const getUsersMoreWatchdeMovies = service.getUsersMoreWatchedMovies;

    getUsersMoreWatchdeMovies.subscribe(
      users => {
        expect(users[0].moviesWatchedCount > users[1].moviesWatchedCount).toBeTruthy();

        done();
      }
    );

    expect(spyGetUsersLocalStorage).toHaveBeenCalled();
  });

  it('(U) topUsersMoreWatchMovies -> Should return top users More Warched Movies', done => {
    const spyGetUsersMoreWatchedMovies = spyOnProperty(service, 'getUsersMoreWatchedMovies', 'get')
    .and.returnValue(of(topUsersMoreWatchedMoviesMock));
    const spyGetUsers = spyOnProperty(usersService, 'getUsers', 'get')
    .and.returnValue(of(usersMock));

    const getTopUsersMoreWatchedMovies = service.topUsersMoreWatchMovies;

    getTopUsersMoreWatchedMovies.subscribe(
      topUsers => {
        expect(topUsers.length).toEqual(2);
        expect(topUsers[0].id).toEqual(1);
        expect(topUsers[1].id).toEqual(2);
        done();
      }
    );

    expect(spyGetUsersMoreWatchedMovies).toHaveBeenCalled();
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('(U) getMetricsById -> Should return metrics movie by id', done => {
    const spyGetMetrics = spyOnProperty(service, 'getMetrics', 'get')
    .and.returnValue(of(metricsMock));
    const getMetricsById = service.getMetricsById(2);

    getMetricsById.subscribe(
      movieWatchedNumber => {
        expect(movieWatchedNumber).toEqual(19);
        done();
      }
    );

    expect(spyGetMetrics).toHaveBeenCalled();
  });
});
