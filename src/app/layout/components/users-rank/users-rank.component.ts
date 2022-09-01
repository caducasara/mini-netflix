import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-users-rank',
  templateUrl: './users-rank.component.html',
  styleUrls: ['./users-rank.component.scss']
})
export class UsersRankComponent {

  @Input() users!: User[];

}
