import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { getMovies } from '../tests/mocks/Movies';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;
  let http: HttpClient;

  const movies = getMovies();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DbService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) getMovies -> Should return Observable Movies array correctly', done => {
    const moviesData = movies;
    const spyGetMovies = spyOn(http, 'get').and.returnValue(of(movies));

    service.getMovies.subscribe(
      movies => {
        expect(movies[0]).toEqual(moviesData[0]);
        done();
      }
    );

    expect(spyGetMovies).toHaveBeenCalled();
  });

  it('(U) getMovieById -> Should return Observable Movie object correctly', done => {
    const spyGetMovieById = spyOn(http, 'get').and.returnValue(of([movies[0]]));

    service.getMovieById(1).subscribe(movie => {
      expect(movie).toEqual(movies[0]);
      done();
    });

    expect(spyGetMovieById).toHaveBeenCalled();
  });
});
