import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { Countries } from 'src/app/enums/countries';
import { User } from 'src/app/interfaces/User';
import { NetflixService } from 'src/app/service/netflix.service';
import { getUserMock } from 'src/app/tests/mocks/Users';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let netflixService: NetflixService;

  const userLoggedMock = getUserMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatMenuModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    netflixService = TestBed.inject(NetflixService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) HeaderComponent -> Should user profile picture to equal a user logged', () => {
    const spyGetUserLogged = spyOnProperty(netflixService, 'getUserLogged', 'get')
     .and.returnValue(of(userLoggedMock as User));

     component.ngOnInit();
     fixture.detectChanges();

     expect(component.userProfilePicture).toEqual(userLoggedMock.picture);
  });
});
