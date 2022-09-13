import { Component, OnInit } from '@angular/core';
import { MoviesCategories } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesList: MoviesCategories[] = [];

  constructor(
    private netFlix: NetflixService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.netFlix.getCategoriesMovies.subscribe(moviesCategoriesList => {
      console.log(moviesCategoriesList)
      this.moviesList = moviesCategoriesList;
    });
  }
}
