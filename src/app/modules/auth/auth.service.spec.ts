import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) signIn() -> Should return true if user is authenticated', () => {
    const userMock = { email: 'user1@teste.com', password: 'teste1'};

    service.signIn(userMock);

    expect(service.isUserAuthenticated).toBeTruthy();
  })

  it('(U) signIn() -> Should return false if user is not authenticated', () => {
    const userMock = { email: 'user1@teste.com', password: 'teste2'};

    service.signIn(userMock);

    expect(service.isUserAuthenticated).toBeFalsy();
  })

  it('(U) logout() -> Should clear user in localStorage', () => {
    service.logout();
    const hasUserIsLocalStorage = localStorage.getItem('Netflix_user');

    expect(hasUserIsLocalStorage).toBeFalsy();
  });

  it('(U) getUserAuthenticated() -> Should return isUserAuthenticated', () => {
    const userValidMock = { email: 'user1@teste.com', password: 'teste1'};

    expect(service.getUserAuthenticated()).toBeFalsy();

    service.signIn(userValidMock);
    expect(service.getUserAuthenticated()).toBeTruthy();
  })
});
