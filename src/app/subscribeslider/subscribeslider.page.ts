import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { EventService } from '../services/event/event.service';
import { UserService } from '../services/user/user.service';
import {Plugins} from '@capacitor/core';
const { Browser } = Plugins;
@Component({
  selector: 'app-subscribeslider',
  templateUrl: './subscribeslider.page.html',
  styleUrls: ['./subscribeslider.page.scss'],
})
export class SubscribesliderPage implements OnInit {
  pcontent: any;
  errors:any = ['',null,undefined];
is_loaded:Boolean=false;
  @ViewChild('mySlider')  slides: IonSlides;
  constructor(public events1: EventService,
public userService:UserService,private router: Router,
private activatedRoute: ActivatedRoute) {
this.viewpodcastsetting();
 }


  ngOnInit() {
  }

  slideOpts = {
    initialSlide: 1,
    spaceBetween: 2,
    margin:0,
    autoplay:true,
    slidesPerView: 3,
    speed: 600,
    breakpoints: {
      320: {
        slidesPerView: 4,
      },
      400: {
        slidesPerView: 4,
      },
      600: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      },
    }
  };

  swipeNext(){
    this.slides.slideNext();
  }

  swipePrev(){
    this.slides.slidePrev();
  }

  async openWithInAppBrowser(url : string) {
    // const url = 'http://capacitor.ionicframework.com/';
    await Browser.open({'url': url});
  }


    viewpodcastsetting(){
    this.userService.postData({id : 1},'view_allpodcastsettingdata').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.pcontent = result.result;
        console.log(this.pcontent);
        
   
      }
     
        else{
        this.userService.presentToast('Error while fetch results! Please try after some time.','danger');
      
      }
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }


}
