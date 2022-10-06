import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NetflixService } from 'src/app/service/netflix.service';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let netflixService: NetflixService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    netflixService = TestBed.inject(NetflixService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) handleClickPLayMovie -> Should call netflix and router methods correctly', () => {
    const spyUpdateMoviesWatched = spyOn(netflixService, 'updateMoviesWatched');
    spyOn(router, 'navigate');

    component.handleClickPLayMovie(1);

    expect(spyUpdateMoviesWatched).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/player', 1]);
  });
});
