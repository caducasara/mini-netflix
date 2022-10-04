import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { getMovies } from '../tests/mocks/Movies';
import { getUsers } from '../tests/mocks/Users';
import { getuserData, getUsersDataInLocalStorage } from '../tests/mocks/UsersDataLocalStorage';
import { DbService } from './db.service';
import { LocalStorageService } from './local-storage.service';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let http: HttpClient;
  let localStorageService: LocalStorageService;
  let dbService: DbService;

  const usersDataMock = getUsers();
  const userMock = getuserData();
  const usersDataLocalStorageMock = getUsersDataInLocalStorage();
  const moviesMock = getMovies();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpClient);
    dbService = TestBed.inject(DbService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getUsers -> Should return users array observable', done => {
    spyOn(http, 'get').and.returnValue(of(usersDataMock));
    const usersData = service.getUsers;

    usersData.subscribe(users => {
      for(let i = 0; i < users.length; i++){
        expect(users[i].id).toEqual(usersDataMock[i].id);
      }

      done();
    });
  });

  it('(U) getUserLogged -> Should return user logged observable', done => {
    spyOnProperty(localStorageService, 'getUserLoggedLocalStorage', 'get').and.returnValue(of(userMock));
    spyOn(http, 'get').and.returnValue(of(usersDataMock));

    const userLogged = service.getUserLogged;

    userLogged.subscribe(
      user => {
        expect(user.id).toEqual(userMock.id);
        expect(user.email).toEqual(userMock.email);
        done();
      }
    );
  });

  it('(U) getUserById -> Should return users observable get by id search', done => {
    spyOn(http, 'get').and.returnValue(of(usersDataMock));
    const user = service.getUserById(1);

    user.subscribe(user => {
      expect(user.id).toEqual(1);
      done();
    });
  });

  it('(U) getMoviesMoreWatchedByUser -> Should return user movies more watched observable get by email search', done => {
    spyOnProperty(localStorageService, 'getUsersLocalStorage', 'get')
    .and.returnValue(of(usersDataLocalStorageMock));

    spyOnProperty(dbService, 'getMovies', 'get').and.returnValue(of(moviesMock));

    const movies = service.getMoviesMoreWatchedByUser('user1@teste.com');

    movies.subscribe(
      movies => {
        const hasMovie = movies.find(movie => movie.id === 1);

        expect(hasMovie).toBeTruthy();
        done();
      }
    );
  });
});
