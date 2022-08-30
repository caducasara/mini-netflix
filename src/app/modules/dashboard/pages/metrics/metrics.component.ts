import { Component, OnInit } from '@angular/core';
import { Movie, TopMoviesCountry } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  topMoviesPerCountry: TopMoviesCountry[] = [];
  topMoviesGlobal: Movie[] = [];

  constructor(
    private netFlix: NetflixService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.topMoviesGlobal = this.netFlix.getTopMoviesGlobal();
  }

}
