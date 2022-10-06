import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NetflixService } from 'src/app/service/netflix.service';
import { getUserMock } from 'src/app/tests/mocks/Users';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let netflixService: NetflixService;
  let authService: AuthService;
  let location: Location;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NetflixService,
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    netflixService = TestBed.inject(NetflixService);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) ProfileComponent -> Should call getUserLogged netflixService mehtod correctly', () => {
    const userMock = getUserMock();
    const spyGetUserLogged = spyOnProperty(netflixService, 'getUserLogged', 'get')
      .and.returnValue(of(userMock as User));
    const spyGetMoviesMoreWatchedByUser = spyOn(netflixService, 'getMoviesMoreWatchedByUser')
      .and.returnValue(of([] as Movie[]));

      component.ngOnInit();
      fixture.detectChanges();

    expect(spyGetUserLogged).toHaveBeenCalled();
    expect(spyGetMoviesMoreWatchedByUser).toHaveBeenCalledWith(userMock.email);
  });

  it('(U) handleClickLogout -> Should call handleClickLogout method corretly', () => {
    const spyLogout = spyOn(authService, 'logout');


    component.handleClickLogout();

    expect(spyLogout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/signin']);
  });

  it('(U) back -> Should call back method corretly', () => {
    const spyLocation = spyOn(location, 'back');

    component.back();

    expect(spyLocation).toHaveBeenCalled();
  });
});
