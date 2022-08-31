import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  movieUrlSafe!:SafeResourceUrl;

  constructor(
    private netflix: NetflixService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);

    const { id } = this.activatedRoute.snapshot.params;

    this.movie = this.netflix.getMovieById(Number(id));
    this.movieUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/DotnJ7tTA34');
    console.log(this.movie)
  }

}
