import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { getMetrics } from '../tests/mocks/Metrics';
import { getUserLogged, getUsersDataInLocalStorage } from '../tests/mocks/UsersDataLocalStorage';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let http: HttpClient;

  const userLocalStorage = getUserLogged();
  const metricsMock = getMetrics();
  const usersDataLocalStorage = getUsersDataInLocalStorage();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(function () {
    localStorage.removeItem('Netflix_user');
    localStorage.removeItem('metrics');
    localStorage.removeItem('users');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getUserLoggedLocalStorage -> Should return user logged obervable in LocalStorage', done => {
    localStorage.setItem('Netflix_user', JSON.stringify(userLocalStorage));

    service.getUserLoggedLocalStorage.subscribe(
      user => {
        expect(user.email).toEqual(userLocalStorage.email);
        done();
      }
    );
  });

  it('(U) getUsersLocalStorage -> Should return users obervable in LocalStorage', done => {
    localStorage.setItem('users', JSON.stringify(usersDataLocalStorage));

    service.getUsersLocalStorage.subscribe(
      users => {
        for (let i = 0; i < users.length; i++) {
          expect(users[i].userEmail).toEqual(usersDataLocalStorage[i].userEmail);
        }

        done();
      }
    );
  });

  it('(U) getUsersLocalStorage -> Should return users array empty obervable in LocalStorage', done => {
    service.getUsersLocalStorage.subscribe(
      users => {
        expect(users.length).toEqual(0);

        done();
      }
    );
  });

  it('(U) getLocalStorageMetrics -> Should return metrics obervable in LocalStorage', done => {
    localStorage.setItem('metrics', JSON.stringify(metricsMock));

    service.getLocalStorageMetrics.subscribe(
      metrics => {
        for (let i = 0; i < metrics.length; i++) {
          expect(metrics[i].movieId).toEqual(metricsMock[i].movieId);
          expect(metrics[i].watchedNumber).toEqual(metricsMock[i].watchedNumber);
        }

        done();
      }
    );
  });

  it('(U) getLocalStorageMetrics -> Should return metrics initial mock obervable when not have localStorage metrics',
    done => {
      const spyGetMetrics = spyOn(http, 'get').and.returnValue(of(metricsMock));

      service.getLocalStorageMetrics.subscribe(
        metrics => {
          for (let i = 0; i < metrics.length; i++) {
            expect(metrics[i].movieId).toEqual(metricsMock[i].movieId);
            expect(metrics[i].watchedNumber).toEqual(metricsMock[i].watchedNumber);
          }

          done();
        }
      );

      expect(spyGetMetrics).toHaveBeenCalled();
    });

  it('(U) updateLocalStorageMetrics -> Should updated metrics in localStorage', () => {
    const metricsMockLen = metricsMock.length;

    service.updateLocalStorageMetrics(metricsMock);

    expect(JSON.parse(localStorage.getItem('metrics') as string)).toEqual(metricsMock);
    expect(JSON.parse(localStorage.getItem('metrics') as string).length).toEqual(metricsMockLen);
  });

  it('(U) updatedMoviesWatchedLocalStorage -> Should upadate user movies watched metrics in users data', () => {
    service.updatedMoviesWatchedLocalStorage(usersDataLocalStorage);

    expect(JSON.parse(localStorage.getItem('users') as string)).toEqual(usersDataLocalStorage);
    expect(JSON.parse(localStorage.getItem('users') as string).length).toEqual(2);
  });

  it('(U) verifyHasUserInLocalStorage -> Should return user list correctly when user exists', () => {
    const result = service.verifyHasUserInLocalStorage('user1@teste.com', usersDataLocalStorage);

    expect(result).toEqual(usersDataLocalStorage);
  });

  it('(U) verifyHasUserInLocalStorage -> Should return user list correctly when user not exists', () => {
    const result = service.verifyHasUserInLocalStorage('user3@teste.com', usersDataLocalStorage);

    const verifyHasUser = result.find(user => user.userEmail === 'user3@teste.com');

    expect(verifyHasUser).toBeTruthy();
    expect(verifyHasUser?.userEmail).toEqual('user3@teste.com');
    expect(verifyHasUser?.movies.length).toEqual(0);
  });
});
