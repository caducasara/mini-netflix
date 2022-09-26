import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Metrics } from '../interfaces/Movie';
import { UserData, UserSingIn } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private http: HttpClient
  ) { }

  get getUserLoggedLocalStorage(): Observable<UserSingIn> {
    return of(JSON.parse(localStorage.getItem('Netflix_user') as string));
  }

  get getUsersLocalStorage(): Observable<UserData[]> {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users') as string);

    return usersLocalStorage ? of(usersLocalStorage) : of([]);
  }

  get getLocalStorageMetrics(): Observable<Metrics[]> {
    const hasMetrics = localStorage.getItem('metrics');

    if (!hasMetrics) {
      return this.http.get<Metrics[]>('assets/database/metrics.json')
    }

    return of(JSON.parse(hasMetrics))
  }

  updateLocalStorageMetrics(newMetrics: Metrics[]) {
    localStorage.setItem('metrics', JSON.stringify(newMetrics));
  }

  updatedMoviesWatchedLocalStorage(newMoviesWatchedMetrics: UserData[]) {
    localStorage.setItem('users', JSON.stringify(newMoviesWatchedMetrics));
  }

  verifyHasUserInLocalStorage(userEmail: string, userList:UserData[]): UserData[]{
    const hasUser = userList.find(user => user.userEmail === userEmail);

    if (!hasUser) {
      return [...userList, { userEmail, movies: [] }];
    }

    return userList;
  }
}
