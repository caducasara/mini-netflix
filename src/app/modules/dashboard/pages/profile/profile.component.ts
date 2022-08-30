import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(
    private netflix: NetflixService
  ) { }

  ngOnInit(): void {
    this.user =  this.netflix.getUserLogged();
  }

}
