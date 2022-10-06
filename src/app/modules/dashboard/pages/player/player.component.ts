import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  movie: Movie = {} as Movie;
  totalMovieWatched!: number;
  movieUrl!: string;

  subscriptionMovie: Subscription = new Subscription();

  constructor(
    private netflix: NetflixService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);

    const { id } = this.activatedRoute.snapshot.params;

    this.subscriptionMovie.add(
      this.netflix.getMovieById(Number(id)).subscribe(movie => {
        this.movie = movie;
        this.movieUrl = movie.trailer;
        this.netflix.getMetricsById(Number(id)).subscribe(totalMovieWatched => {
          this.totalMovieWatched = totalMovieWatched;
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionMovie.unsubscribe();
  }

  back() {
    this.location.back()
  }
}
