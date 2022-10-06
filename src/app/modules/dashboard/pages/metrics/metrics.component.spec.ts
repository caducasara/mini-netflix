import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NetflixService } from 'src/app/service/netflix.service';

import { MetricsComponent } from './metrics.component';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;
  let netflixService: NetflixService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricsComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();NetflixService
    netflixService = TestBed.inject(NetflixService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) MetricsComponent -> Shoul call netflix service corretly', () => {
    const spygetTopMoviesPerCountry =
      spyOnProperty(netflixService, 'getTopMoviesPerCountry', 'get')
        .and.returnValue(of([]));
    const spyGetTopMoviesGlobal =
      spyOnProperty(netflixService, 'getTopMoviesGlobal', 'get')
        .and.returnValue(of([]));
    const spyGetCategoriesMovies =
      spyOnProperty(netflixService, 'getCategoriesMovies', 'get')
        .and.returnValue(of([]));
    const spyTopUsersMoreWatchMovies =
      spyOnProperty(netflixService, 'topUsersMoreWatchMovies', 'get')
        .and.returnValue(of([]));

      component.ngOnInit();
      fixture.detectChanges();

      expect(spygetTopMoviesPerCountry).toHaveBeenCalled();
      expect(spyGetTopMoviesGlobal).toHaveBeenCalled();
      expect(spyGetCategoriesMovies).toHaveBeenCalled();
      expect(spyTopUsersMoreWatchMovies).toHaveBeenCalled();
    })
});
