import { Component, OnInit } from '@angular/core';
import { Movie, MoviesCategories, TopMoviesCountry } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  topMoviesPerCountry: TopMoviesCountry[] = [];
  topMoviesPerCategory: MoviesCategories[] = [];
  topMoviesGlobal: Movie[] = [];

  constructor(
    private netFlix: NetflixService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.topMoviesPerCountry = this.netFlix.getTopMoviesPerCountry();
    this.topMoviesGlobal = this.netFlix.getTopMoviesGlobal();
    this.topMoviesPerCategory = this.netFlix.getCategoriesMovies();
  }

}
