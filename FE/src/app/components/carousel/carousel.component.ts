import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  slides = [
    { 'image': './assets/images/11.jpg' },
    { 'image': './assets/images/22.jpg' },
    { 'image': './assets/images/33.jpg' },
    { 'image': './assets/images/44.jpg' }
  ];
}
