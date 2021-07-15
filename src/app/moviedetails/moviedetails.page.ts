import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { EventService } from '../services/event/event.service';
import { UserService } from '../services/user/user.service';
import { Plugins } from '@capacitor/core';
import { BranchInitEvent } from 'capacitor-branch-deep-links';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
const { AdMob, Toast } = Plugins;
 const { BranchDeepLinks } = Plugins;
const { Share } = Plugins;
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.page.html',
  styleUrls: ['./moviedetails.page.scss'],
})
export class MoviedetailsPage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;
 errors:any = ['',null,undefined];
is_loaded:Boolean=false;
content:any;
image:any;
IMAGES_URL:any=config.IMAGES_URL;
BASE_URL:any=config.BASE_URL;
id:any;
data: any;
time: any;
rcontent: any;
share_message:any;
dates: any;

  constructor(public events1: EventService,
public userService:UserService,private router: Router,
private activatedRoute: ActivatedRoute) { 
   this.id = activatedRoute.snapshot.paramMap.get('id');
   console.log(this.id);
   this.viewdata();
 }

  ngOnInit() { 
  }

   ionViewDidEnter(){
      this.time = new Date().getTime();
  console.log(this.time);
  if(this.time % 2 == 0) {
     this.loadInterstitial();
}

// if the number is odd
else {
    this.loadInterstitialVideo();
}
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

  loadInterstitial() {
    console.log('load image interstitial');
    const options: AdOptions = {
      adId: 'ca-app-pub-1450615658019568/2088491927',
      autoShow: false
    }
    AdMob.prepareInterstitial(options)
      .then(
        async (value: any) => {
          if (value) {
            // await Toast.show({
            //   text: 'Interstitial AD Loaded'
            // });

              setTimeout(() => {

                 this.showInterstitial();  

          }, 1000);
          }
          console.log(value);  // true
        },
        (error: any) => {
          console.error(error); // show error
        }
      );

      
  }

    loadInterstitialVideo() {
       console.log('load video interstitial');
    const options: AdOptions = {
      adId: 'ca-app-pub-1450615658019568/2088491927',
      autoShow: false
    }
    AdMob.prepareInterstitial(options)
      .then(
        async (value: any) => {

          if (value) {
            // await Toast.show({
            //   text: 'Interstitial AD Loaded'
            // });

            setTimeout(() => {

                 this.showInterstitialVideo();  

          }, 1000);

        
          }
       
          console.log(value);  // true
        },
        (error: any) => {
          console.error(error); // show error
        }
      );


  }
  showInterstitialVideo() {
   
 AdMob.showInterstitial().then(
                    (value: any) => {
                      console.log(value);  // true
                    },
                    (error: any) => {
                      console.error(error); // show error
                    }
                  );

  }
  showInterstitial() {
    AdMob.showInterstitial().then(
      (value: any) => {
        console.log(value);  // true
      },
      (error: any) => {
        console.error(error); // show error
      }
    );
  }

   viewdata(){
    this.userService.presentLoading();
    this.userService.postData({id : this.id},'view_moviesdetails').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.content = result.result;
        this.dates = result.date;
        console.log(this.content);
        console.log(result.date);
        this.viewrelatedata(this.content.title);
        this.share_message = 'Share this movie with your nearest friends and be the part of '+this.content.title;
   
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

  viewrelatedata(title){
    // this.userService.presentLoading();
    this.userService.postData({title : title, id: this.id},'view_relatedmoviesdetails').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.rcontent = result.result;
        console.log(this.rcontent);
   
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

  shares(){
// optional fields
var analytics = {
  channel: 'facebook',
  feature: 'onboarding',
  campaign: 'content 123 launch',
  stage: 'new user',
  tags: ['one', 'two', 'three']
}

// optional fields
var properties = {
  $desktop_url: 'http://www.google.com/desktop',
  $android_url: 'http://www.google.com/android',
  $ios_url: 'http://www.google.com/ios',
  $ipad_url: 'http://www.google.com/ipad',
  $match_duration: 2000,
  custom_string: 'data',
  custom_integer: Date.now(),
  custom_boolean: true
}
var shareText = 'Share '+this.content.title+' movie reviews with your nearest friends. Checkout the link:'

BranchDeepLinks.showShareSheet({ analytics, properties, shareText }).then(function (res) {
  console.log('Response: ' + JSON.stringify(res))


//   let shareRet =  Share.share({
//   title: 'ToddWofford Movies',
//   text: this.share_message,
//   url: res.url,
//   dialogTitle: 'Share with buddies'
// });
}).catch(function (err) {
  console.log('Error: ' + JSON.stringify(err))
})


//  let shareRet = await Share.share({
//   title: 'ToddWofford Movies',
//   text: this.share_message,
//   url: 'https://www.toddwoffordmovies.com/',
//   dialogTitle: 'Share with buddies'
// });
  }  

}
