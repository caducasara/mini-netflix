import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private netflix: NetflixService,
    private auth: AuthService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user =  this.netflix.getUserLogged();
  }

  handleClickLogout(){
    this.auth.logout();
    this.router.navigate(['/signin']);
  }

  back() {
    this.location.back()
  }
}
