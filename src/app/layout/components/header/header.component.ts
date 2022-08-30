import { Component, OnInit } from '@angular/core';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userProfilePicture!: string;

  constructor(
    private netflix: NetflixService
  ) { }

  ngOnInit(): void {
    const { picture } = this.netflix.getUserLogged();
    this.userProfilePicture = picture as string;
  }

}
