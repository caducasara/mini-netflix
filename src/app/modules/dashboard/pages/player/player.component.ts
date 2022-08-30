import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  movie!: Movie;

  constructor(
    private netflix: NetflixService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.movie = this.netflix.getMovieById(Number(id));
    console.log(this.movie)
  }

}
