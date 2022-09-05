import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Countries } from 'src/app/enums/countries';
import { NetflixService } from 'src/app/service/netflix.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let netflixService: NetflixService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [NetflixService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
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
