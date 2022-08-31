import { Component, Input, OnInit } from '@angular/core';
import { getUsers } from 'src/app/database/Users';
import { User } from 'src/app/interfaces/User';
import { NetflixService } from 'src/app/service/netflix.service';

@Component({
  selector: 'app-users-rank',
  templateUrl: './users-rank.component.html',
  styleUrls: ['./users-rank.component.scss']
})
export class UsersRankComponent implements OnInit {

  users!: User[];

  constructor(
    private netflix: NetflixService
  ) { }

  ngOnInit(): void {
    this.users = this.getUserInfos();
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
