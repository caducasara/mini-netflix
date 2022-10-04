import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie, MoviesCategories, TopMoviesCountry } from 'src/app/interfaces/Movie';
import { User } from 'src/app/interfaces/User';
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
  topUsersMoreWatchMovies: User[] = [];

  subscriptionTopMoviesPerCountry: Subscription =  new Subscription();
  subscriptionTopMoviesPerCategory: Subscription =  new Subscription();
  subscriptionTopMoviesGlobal: Subscription =  new Subscription();
  subscriptionGetUserInfos: Subscription =  new Subscription();

  constructor(
    private netflix: NetflixService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.subscriptionTopMoviesPerCountry.add(
      this.netflix.getTopMoviesPerCountry.subscribe(topMoviesPerContry => {
        this.topMoviesPerCountry = topMoviesPerContry;
      })
    );

    this.subscriptionTopMoviesGlobal.add(
      this.netflix.getTopMoviesGlobal.subscribe(topGlobalMovies => {
        this.topMoviesGlobal = topGlobalMovies;
      })
    );

    this.subscriptionTopMoviesPerCategory.add(
      this.netflix.getCategoriesMovies.subscribe(categoriesMovieList => {
        this.topMoviesPerCategory = categoriesMovieList;
      })
    );


    this.subscriptionGetUserInfos.add(
      this.netflix.topUsersMoreWatchMovies.subscribe(usersMoreWatchedMovies => {
        this.topUsersMoreWatchMovies = usersMoreWatchedMovies;
      })
    );
  }

  ngOnDestroy(){
    this.subscriptionTopMoviesPerCountry.unsubscribe();
    this.subscriptionTopMoviesPerCategory.unsubscribe();
    this.subscriptionTopMoviesGlobal.unsubscribe();
    this.subscriptionGetUserInfos.unsubscribe();
  }

}
