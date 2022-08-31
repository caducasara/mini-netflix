import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MatIconModule } from '@angular/material/icon';
import { UsersRankComponent } from './components/users-rank/users-rank.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    MovieCardComponent,
    UsersRankComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    CarouselComponent,
    UsersRankComponent,
  ]
})
export class LayoutModule { }
