import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesCategories } from 'src/app/interfaces/Movie';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesList: MoviesCategories[] = [];
  subscriptionMovieList: Subscription = new Subscription();

  constructor(
    private netFlix: NetflixService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.subscriptionMovieList.add(
      this.netFlix.getCategoriesMovies.subscribe(moviesCategoriesList => {
        this.moviesList = moviesCategoriesList;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptionMovieList.unsubscribe();
  }
}
