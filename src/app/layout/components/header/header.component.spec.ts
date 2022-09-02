import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Countries } from 'src/app/ENUMS/countries';
import { NetflixService } from 'src/app/service/netflix.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let netflixService: NetflixService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [NetflixService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    netflixService = TestBed.inject(NetflixService);
    component = fixture.componentInstance;
    spyOn(netflixService, 'getUserLogged').and.returnValue({
      id: 1,
      firstName: 'firtName-mock',
      lastName: 'lastName-mock',
      email: 'email-mock',
      picture: 'picture-mock',
      password: 'password-mock',
      token: 'token-mock',
      country: Countries.Brazil,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
