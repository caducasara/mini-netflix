import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  afterEach(function() {
    localStorage.removeItem('Netflix_user');
  })

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('(U) canActivate() -> Should to allow access the route', () => {
    const userValidMock = { email: 'user1@teste.com', password: 'teste1'};
    localStorage.setItem('Netflix_user', JSON.stringify(userValidMock));

    expect(guard.canActivate()).toBeTruthy();
  });

  it('(U) canActivate() -> Should not to allow access the route', () => {
    const userValidMock = { email: 'user4@teste.com', password: 'teste6'};
    localStorage.setItem('Netflix_user', JSON.stringify(userValidMock));

    expect(guard.canActivate()).toBeFalsy();
  });

  it('(U) canActivate() -> Should to allow access the route if AuthService authenticated user', () => {
    spyOn(authService, 'getUserAuthenticated').and.returnValue(true);
    expect(guard.canActivate()).toBeTruthy();
  });

  it('(U) canActivate() -> Should not to allow access the route if AuthService not authenticated user', () => {
    spyOn(authService, 'getUserAuthenticated').and.returnValue(false);
    expect(guard.canActivate()).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });
});
