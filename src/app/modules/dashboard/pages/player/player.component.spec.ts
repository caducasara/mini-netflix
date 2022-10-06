import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

import { PlayerComponent } from './player.component';
import { SafePipe } from './safe.pipe';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let netflixService: NetflixService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent, SafePipe],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [{
        provide: ActivatedRoute, useValue: {
          snapshot: {
            params: { id: '1' }
          }
        }
      }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    netflixService = TestBed.inject(NetflixService);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) PlayerComponent -> Should call netflixService methods correctly', () => {
    const spyGetMovieById = spyOn(netflixService, 'getMovieById')
      .and.returnValue(of({} as Movie));
    const spyGetMetricsById = spyOn(netflixService, 'getMetricsById')
      .and.returnValue(of(3));

      component.ngOnInit();
      fixture.detectChanges();

    expect(spyGetMovieById).toHaveBeenCalledWith(1);
    expect(spyGetMetricsById).toHaveBeenCalledWith(1);
  });

  it('(U) back -> Should call location back method correctly', () => {
    const spyLocation = spyOn(location, 'back');

    component.back();

    expect(spyLocation).toHaveBeenCalled();
  });
});
