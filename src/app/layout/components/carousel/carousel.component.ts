import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() movies!: Movie[];
  @Input() showRank: boolean = false;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: false,
    prevArrow: false,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
