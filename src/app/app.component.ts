import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from './services/event/event.service';
import { UserService } from './services/user/user.service';
import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Plugins} from '@capacitor/core';
 import { BranchInitEvent } from 'capacitor-branch-deep-links';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
const { AdMob, Toast } = Plugins;
 const { BranchDeepLinks } = Plugins;
const { Browser } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
   pcontent: any;
  errors:any = ['',null,undefined];
is_loaded:Boolean=false;
  public appPages = [
    { title: 'Home', url: '/home'},
    // { title: 'The Latest', url: '/latest'},
    // { title: 'The Greatest', url: '/greatest'},
    // { title: 'The Laughable', url: '/laughable'},
    // { title: 'The Archive', url: '/archive'},
    // { title: 'The Drink Menu', url: '/drinkmenu'},
    { title: 'Podcast', url: '/podcast'},
    // { title: 'Advertise', url: '/advertise'},
    { title: 'Subscribe', url: '/subscribe'},   
    { title: 'Contact', url: '/contact'},
  ];
  constructor(public events1: EventService,
public userService:UserService,private router: Router,
private activatedRoute: ActivatedRoute,private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar) {
this.viewpodcastsetting();
this.initializeApp();

 AdMob.initialize("ca-app-pub-1450615658019568~1330832078");
console.log(BranchDeepLinks)
this.showTabBarBanner();
 
  

  }

  // ionViewDidEnter(){
    
  //  }

 showTabBarBanner() {
    console.log('ad worked');
    const options: AdOptions = {
      adId: 'ca-app-pub-1450615658019568/3842758429',
      adSize: AdSize.SMART_BANNER,
      position: AdPosition.BOTTOM_CENTER,
     autoShow: false,
      // hasTabBar: true,  // make it true if you have TabBar Layout.
      // tabBarHeight: 56  // you can assign custom margin in pixel default is 56
    };

    // Show Banner Ad
    AdMob.showBanner(options)
      .then(
        async (value: any) => {
          console.log(value);  // true
          // await Toast.show({
          //   text: 'loading Banner AD.'
          // })
        },
        (error: any) => {
          console.error(error); // show error
        }
      );
    // Subscibe Banner Event Listener
    AdMob.addListener('onAdLoaded', async (info: boolean) => {
      console.log('Showing TabBar Banner AD.');
    });
    
  } 

   async openWithInAppBrowser(url : string) {
    // const url = 'http://capacitor.ionicframework.com/';
    await Browser.open({'url': url});
  }

  viewpodcastsetting(){
    this.userService.postData({id : 1},'view_allsocialsettingdata').subscribe((result) => {
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

     initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
       BranchDeepLinks.addListener('init', (event: BranchInitEvent) => {
         // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
         // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
         console.log(event.referringParams);
       });

       console.log(BranchDeepLinks)

       BranchDeepLinks.addListener('initError', (error: any) => {
         console.error(error);
       });
      });
    }

}
