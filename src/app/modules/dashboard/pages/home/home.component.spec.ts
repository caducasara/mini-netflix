import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NetflixService } from 'src/app/service/netflix.service';
import { getMoviesCategories } from 'src/app/tests/mocks/moviesByCategory';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let netflixService: NetflixService;

  const moviesCategoriesMock = getMoviesCategories();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    netflixService = TestBed.inject(NetflixService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) HomeComponent -> Should call netflixService correctly', () => {
    const spyNetflixService = spyOnProperty(netflixService, 'getCategoriesMovies', 'get')
      .and.returnValue(of(moviesCategoriesMock));

    component.ngOnInit();
    fixture.detectChanges();

    expect(spyNetflixService).toHaveBeenCalled();
  });
});
