import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { EventService } from '../services/event/event.service';
import { UserService } from '../services/user/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Plugins} from '@capacitor/core';
const { Browser } = Plugins;
import { BranchInitEvent } from 'capacitor-branch-deep-links';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
const { AdMob, Toast } = Plugins;
 const { BranchDeepLinks } = Plugins;
const { Share } = Plugins;
@Component({
  selector: 'app-podcastdetails',
  templateUrl: './podcastdetails.page.html',
  styleUrls: ['./podcastdetails.page.scss'],
})
export class PodcastdetailsPage implements OnInit {
errors:any = ['',null,undefined];
is_loaded:Boolean=false;
content:any;
image:any;
IMAGES_URL:any=config.IMAGES_URL;
id:any;
data: any;
time: any;
dates: any;
share_message: any;
url: any;
pcontent: any;
thumbnail : any;
video_url : SafeResourceUrl;
  constructor(public events1: EventService,
public userService:UserService,private router: Router,
private activatedRoute: ActivatedRoute,public sanitizer:DomSanitizer) { 
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


  async openWithInAppBrowser(url : string) {
    // const url = 'http://capacitor.ionicframework.com/';
    await Browser.open({'url': url});
  }


   viewdata(){
    this.userService.presentLoading();
    this.userService.postData({id : this.id},'view_podcastdetails').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.content = result.result;
        this.dates = result.date;
        this.url=result.videourl;
this.video_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        console.log(this.content);
        console.log(result.date);
        this.share_message = 'Share this podcast with your nearest friends and be the part of '+this.content.title; 
   
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
var shareText = 'Share '+this.content.title+' podcast reviews with your nearest friends. Checkout the link:' 

BranchDeepLinks.showShareSheet({ analytics, properties, shareText }).then(function (res) {
  console.log('Response: ' + JSON.stringify(res))

}).catch(function (err) {
  console.log('Error: ' + JSON.stringify(err))
})


  }  

}