import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-realtedarticles',
  templateUrl: './realtedarticles.page.html',
  styleUrls: ['./realtedarticles.page.scss'],
})
export class RealtedarticlesPage implements OnInit {

  @ViewChild('mySlider')  slides: IonSlides;
  constructor() { }

  ngOnInit() {
  }

  slideOpts = {
    initialSlide: 3,
    spaceBetween: 5,
    margin:0,
    autoplay:true,
    slidesPerView: 3,
    speed: 600,
    breakpoints: {
      320: {
        slidesPerView: 3,
      },
      400: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    }
  };

  swipeNext(){
    this.slides.slideNext();
  }

  swipePrev(){
    this.slides.slidePrev();
  }

}
