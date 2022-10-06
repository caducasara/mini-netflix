import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {} as User;
  moviesMoreWatched: Movie[] = [];

  subscriptionUserInfos: Subscription = new Subscription();

  constructor(
    private netflix: NetflixService,
    private auth: AuthService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.subscriptionUserInfos.add(
      this.netflix.getUserLogged.subscribe(
        user => {
          this.user = user;
          this.netflix.getMoviesMoreWatchedByUser(this.user.email as string)
            .subscribe(movies => {
              this.moviesMoreWatched = movies;
            })
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptionUserInfos.unsubscribe();
  }

  handleClickLogout(){
    this.auth.logout();
    this.router.navigate(['/signin']);
  }

  back() {
    this.location.back()
  }
}
