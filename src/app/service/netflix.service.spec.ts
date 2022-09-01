import { TestBed } from '@angular/core/testing';
import { getMovies } from '../database/Movies';
import { getUsers } from '../database/Users';
import { User, UserWatchedMoviesCount } from '../interfaces/User';

import { NetflixService } from './netflix.service';

describe('NetflixService', () => {
  let service: NetflixService;

  const categoriesMock = ['Animation', 'Action', 'Drama', 'Fantasy', 'Comedy'];

  const moviesMock = [
    {
      id: 1,
      title: 'mock-title',
      folder: 'mock-folder',
      synopsi: 'mock-synopsi',
      year: 'mock-year',
      category: 'Fantasy',
      trailer: 'mock-trailer',
      watchedNumber: {
        total: 3,
        countries: {
          Brazil: 1,
          USA: 1,
          Argentina: 1
        }
      }
    },
    {
      id: 2,
      title: 'mock-title',
      folder: 'mock-folder',
      synopsi: 'mock-synopsi',
      year: 'mock-year',
      category: 'Comedy',
      trailer: 'mock-trailer',
      watchedNumber: {
        total: 6,
        countries: {
          Brazil: 2,
          USA: 2,
          Argentina: 2
        }
      }
    },
    {
      id: 3,
      title: 'mock-title',
      folder: 'mock-folder',
      synopsi: 'mock-synopsi',
      year: 'mock-year',
      category: 'Action',
      trailer: 'mock-trailer',
      watchedNumber: {
        total: 9,
        countries: {
          Brazil: 3,
          USA: 3,
          Argentina: 3
        }
      }
    },
    {
      id: 4,
      title: 'mock-title',
      folder: 'mock-folder',
      synopsi: 'mock-synopsi',
      year: 'mock-year',
      category: 'Comedy',
      trailer: 'mock-trailer',
      watchedNumber: {
        total: 12,
        countries: {
          Brazil: 4,
          USA: 4,
          Argentina: 4
        }
      }
    },
    {
      id: 5,
      title: 'mock-title',
      folder: 'mock-folder',
      synopsi: 'mock-synopsi',
      year: 'mock-year',
      category: 'Fantasy',
      trailer: 'mock-trailer',
      watchedNumber: {
        total: 15,
        countries: {
          Brazil: 5,
          USA: 5,
          Argentina: 5
        }
      }
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetflixService);
  });

  afterEach(function() {
    localStorage.removeItem('Netflix_user');
    localStorage.removeItem('users');
})

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getMoviesByCategory() -> Should return movies By category and sorted', () => {
    const movies = service.getMoviesByCategory('Animation');

    movies.forEach(movie => {
      expect(movie.category).toEqual('Animation');
    });

    expect(movies[0].watchedNumber.total > movies[1].watchedNumber.total).toBeTruthy();
  });

  it('(U) getCategoriesMovies() -> Should return movies list per category and sorted', () => {
    const moviesPerCategory = service.getCategoriesMovies();

    categoriesMock.forEach(category => {
      const validate = moviesPerCategory.some(moviesCategory => moviesCategory.name === category);

      expect(validate).toBeTruthy();
    });
  });


  it('(U) getMoviesSort() -> Should return movies list sorted', () => {
    const usersLocalStorageMock = [
      {
        userEmail: 'user1@teste.com',
        movies: [
          {
            movieId: 1,
            views: 2
          }
        ]
      }
    ]

    spyOn(Storage.prototype, 'getItem').and.returnValue(JSON.stringify(usersLocalStorageMock));

    const moviesSorted = service.getMoviesSort(moviesMock);
    const findMovie = moviesSorted.find(movie => movie.id === 1);

    expect(findMovie?.watchedNumber.total === 5).toBeTruthy();
  });

  it('(U) getTopMoviesGlobal() -> Should return top movies sorted by watched number', () => {
    const getMoviesSortedSpy = spyOn(service, 'getMoviesSort').and.returnValue(moviesMock);
    const getTopMoviesGlobalReturn = service.getTopMoviesGlobal();

    expect(getMoviesSortedSpy).toHaveBeenCalled();
    expect(getTopMoviesGlobalReturn[0].watchedNumber.total).toEqual(15);
    expect(getTopMoviesGlobalReturn[0].watchedNumber.total !== 15).toBeFalsy();
  });

  it('(U) getTopMoviesPerCountry -> Should return top movies per country and sorte by watched number', () => {
    const getMoviesSortedSpy = spyOn(service, 'getMoviesSort').and.returnValue(moviesMock);
    const getTopMoviesPerCountryReturn = service.getTopMoviesPerCountry();
    const topBr = getTopMoviesPerCountryReturn.find(country => country.countryName === 'Brazil');
    const topUSA = getTopMoviesPerCountryReturn.find(country => country.countryName === 'USA');
    const topArg = getTopMoviesPerCountryReturn.find(country => country.countryName === 'Argentina');

    expect(getMoviesSortedSpy).toHaveBeenCalled();
    expect(topBr?.movies[0].id).toEqual(5);
    expect(topUSA?.movies[0].id).toEqual(5);
    expect(topArg?.movies[0].id).toEqual(5);
  });

  it('(U) updateMoviesWatched -> Should udpdated user actions', () => {
    const userLocalStorageMock = { email: 'user1@teste.com' };
    const mockUserMoviesWatched = [
      {
        userEmail: 'user1@teste.com',
        movies: [
          {
            movieId: 1,
            views: 2
          }
        ]
      }
    ];

    localStorage.setItem('Netflix_user', JSON.stringify(userLocalStorageMock));
    localStorage.setItem('users', JSON.stringify(mockUserMoviesWatched));
    service.updateMoviesWatched(1);

    const updated = JSON.parse(localStorage.getItem('users') as string);
    const { email } = userLocalStorageMock;
    const findUserAction = updated.findIndex((user: UserWatchedMoviesCount) => user.userEmail === email);

    expect(updated[findUserAction].movies.length).toEqual(1);
    expect(updated[findUserAction].movies[0].views).toEqual(3);
  });

  it('(U) updateMoviesWatched -> Should create user movies watched data in localStorage', () => {
    const userLocalStorageMock = { email: 'userMock@teste.com' };

    localStorage.setItem('Netflix_user', JSON.stringify(userLocalStorageMock));
    service.updateMoviesWatched(1);

    const updated = JSON.parse(localStorage.getItem('users') as string);
    const { email } = userLocalStorageMock;
    const findUserAction = updated.findIndex((user: UserWatchedMoviesCount) => user.userEmail === email);
    const userMoviesWatched = updated[findUserAction].movies;

    expect(updated[findUserAction].userEmail).toEqual(email);
    expect(userMoviesWatched.length).toEqual(1);
    expect(userMoviesWatched[0].movieId).toEqual(1);
  });

  it('(U) getUserLogged -> Should return the user logged', () => {
    const userLocalStorageMock = { email: 'user1@teste.com' };

    localStorage.setItem('Netflix_user', JSON.stringify(userLocalStorageMock));
    const userLogged = service.getUserLogged();

   expect(userLogged.email).toEqual(userLocalStorageMock.email);
  });

  it('(U) getMovieById -> Should return the movie correct', () => {
    const movieSearch = service.getMovieById(3);
    const expectedResult = getMovies().find(movie => movie.id === 3);

    expect(movieSearch.title).toEqual(expectedResult?.title as string);
    expect(movieSearch.id).toEqual(expectedResult?.id as number);
    expect(movieSearch.category).toEqual(expectedResult?.category as string);
  });

  it('(U) getUsersMoreWatchedMovies -> Should return the user who more watched movies sorted', () => {
   const usersDataMock = [
      {
        userEmail: 'user1@teste.com',
        movies: [
          {
            movieId: 1,
            views: 2
          }
        ]
      },
      {
        userEmail: 'user2@teste.com',
        movies: [
          {
            movieId: 1,
            views: 3
          },
          {
            movieId: 2,
            views: 1
          }
        ]
      }
    ];

    localStorage.setItem('users', JSON.stringify(usersDataMock));

    const userMoreWatchedMovies = service.getUsersMoreWatchedMovies();

    expect(userMoreWatchedMovies[0].userEmail).toEqual('user2@teste.com');
    expect(userMoreWatchedMovies.length).toEqual(2);
  });

  it('(U) getUsersMoreWatchedMovies -> Should return the user who more watched movies empty', () => {
    const userMoreWatchedMovies = service.getUsersMoreWatchedMovies();

    expect(userMoreWatchedMovies).toEqual([]);
    expect(userMoreWatchedMovies.length).toEqual(0);
   });
});
