import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { DbService } from 'src/app/service/db.service';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;
  moviesMoreWatched: Movie[] = [];

  subscriptionMoviesMorewatched: Subscription = new Subscription();

  constructor(
    private netflix: NetflixService,
    private auth: AuthService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user =  this.netflix.getUserLogged();

    this.subscriptionMoviesMorewatched.add(
      this.netflix.getMoviesMoreWatchedByUser(this.user.email as string)
        .subscribe(movies => {
          this.moviesMoreWatched = movies;
        })
    )
  }

  ngOnDestroy() {
    this.subscriptionMoviesMorewatched.unsubscribe();
  }

  handleClickLogout(){
    this.auth.logout();
    this.router.navigate(['/signin']);
  }

  back() {
    this.location.back()
  }
}
