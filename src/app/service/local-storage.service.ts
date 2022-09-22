import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Metrics } from '../interfaces/Movie';
import { UserData, UserSingIn } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get getUserLoggedLocalStorage(): Observable<UserSingIn> {
    return of(JSON.parse(localStorage.getItem('Netflix_user') as string));
  }

  get getUsersLocalStorage(): Observable<UserData[]> {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users') as string);

    return usersLocalStorage ? of(usersLocalStorage) : of([]);
  }

  updateLocalStorageMetrics(newMetrics: Metrics[]) {
    localStorage.setItem('metrics', JSON.stringify(newMetrics));
  }

  updatedMoviesWatchedLocalStorage(newMoviesWatchedMetrics: UserData[]) {
    localStorage.setItem('users', JSON.stringify(newMoviesWatchedMetrics));
  }
}
