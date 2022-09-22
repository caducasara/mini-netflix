import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie = {} as Movie;
  @Input() exibPosition!: boolean;
  @Input() position!: number;

  routeActive!: string;

  constructor(
    private netflix: NetflixService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeActive = this.route.snapshot.url[0]?.path
      ? this.route.snapshot.url[0].path
      : '/';
  }

  handleClickPLayMovie(movieID: number){
    this.netflix.updateMoviesWatched(movieID);
    this.router.navigate(['/player', movieID]);
  }

}
