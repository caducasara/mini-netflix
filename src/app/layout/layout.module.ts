import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    CarouselComponent,
    MovieCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    CarouselComponent
  ]
})
export class LayoutModule { }
