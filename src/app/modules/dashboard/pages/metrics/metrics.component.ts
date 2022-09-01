import { Component, OnInit } from '@angular/core';
import { getUsers } from 'src/app/database/Users';
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

  constructor(
    private netflix: NetflixService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.topMoviesPerCountry = this.netflix.getTopMoviesPerCountry();
    this.topMoviesGlobal = this.netflix.getTopMoviesGlobal();
    this.topMoviesPerCategory = this.netflix.getCategoriesMovies();
    this.topUsersMoreWatchMovies = this.getUserInfos();
  }


  getUserInfos(): User[]{
    const usersMock = getUsers();
    const usersData = this.netflix.getUsersMoreWatchedMovies();
    const usersFormated = usersData.map(user => {
    const findUser = usersMock.find(userMocked => userMocked.email === user.userEmail);

      return findUser as User;
    }).slice(0, 3);

    return usersFormated;
  }
}
