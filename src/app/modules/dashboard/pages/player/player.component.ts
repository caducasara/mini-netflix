import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  movie!: Movie;
  movieUrlSafe!:SafeResourceUrl;
  totalMovieWatched!: number;

  subscriptionMovie: Subscription = new Subscription();

  constructor(
    private netflix: NetflixService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private location: Location
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);

    const { id } = this.activatedRoute.snapshot.params;

    this.subscriptionMovie.add(
      this.netflix.getMovieById(Number(id)).subscribe(movie => {
        this.movie = movie;
        this.netflix.getMetricsById(Number(id)).subscribe(totalMovieWatched => {
          this.totalMovieWatched = totalMovieWatched;
        });
        this.movieUrlSafe = this.sanitizer
          .bypassSecurityTrustResourceUrl(this.movie.trailer);
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
