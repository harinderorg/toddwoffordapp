import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import {  Router,ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service';
import {Plugins} from '@capacitor/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';
const { AdMob, Toast } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit { 
  cname:any = [];
filterTerm: string;
  public win: any = window;
  errors:any=['',null,undefined];
is_submit:boolean=false;
IMAGES_URL:any=config.IMAGES_URL;
is_loaded:Boolean=false;
content:any=[];
mdata:any=[];
page_number = 0;
fpage_number = 0;
ratings:any;
min_rate:number=1;
 max_rate: number=5;
allcategories:any;
start:number;
start_v:number;
is_more_records:boolean = true;
is_more_records_v:boolean = false;
allowedMimes:any=config.IMAGE_EXTENSIONS;
  movielist: any ='latest';
  cbox: any[] =  [
       {id: 1, testName: "The Latest", checked: false},
       {id: 2, testName: "The Archive", checked: false},
       {id: 3, testName: "The Greatest", checked: false},
       {id: 4, testName: "The Laughable", checked: false}
    ];
  @ViewChild('mySlider')  slides: IonSlides;
@ViewChild('contents', {static: true}) private contents: any;
  constructor(public modalController: ModalController,public events1: EventService, 
   private router: Router, public userService: UserService,private ref: ChangeDetectorRef, 
    private activatedRoute: ActivatedRoute) {
AdMob.initialize("ca-app-pub-1450615658019568~1330832078");
  }

   ionViewDidEnter(){
    this.allcategories = [];
   }

   

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'filtermodal',
 componentProps: { 
        filters : { 
          min_rate: this.min_rate,
          max_rate: this.max_rate,
           cbox: this.cbox,
          categories: this.allcategories,
        }
      }
    });
        modal.onDidDismiss().then((detail) => {
      console.log('detail')
      console.log(detail)
       if(this.errors.indexOf(detail.data) == -1) {
          if(detail.data.reset == '1'){
            
           
            // this.scrollToTop();
            var self = this;
            setTimeout(function(){
                self.fpage_number = 0;
                self.is_loaded = false;
                self.is_more_records = true;
                self.is_more_records_v = false;
                self.min_rate = 1;
                self.max_rate = 5;
                self.allcategories = [];
                self.content = [];
                self.viewdata(false, "");
              
             
            },500);
          }
          if(detail.data.applied == '1'){
            let cat_name = []; 
              this.max_rate = detail.data.max_rate;
              this.min_rate = detail.data.min_rate;
              this.allcategories = detail.data.categories;
              this.allcategories = detail.data.categories;
            this.allcategories.forEach(function(value, key) {
  cat_name.push(value);
});
            this.cname = cat_name;
            console.log(this.cname);
      //      this.allcategories.forEach(item => {
      //   this.cat_name = item.testName;
      // });
            // this.scrollToTop();
            var self = this;
            setTimeout(function(){
             
                self.fpage_number = 0;
                self.is_loaded = false;
                self.is_more_records = false;
                self.is_more_records_v = true;
                self.content = [];
                self.getfdata(false, "");
              
              
            },500);
          }
       }
    });
    return await modal.present();
  }

  
 scrollToTop() {
    var self = this;
    setTimeout(function(){
      self.contents.scrollToTop(300);
    },100);
  }

  ngOnInit() {
    this.viewdata(false, "");
  }

   viewdata(isFirstLoad, event){
    // this.userService.presentLoading();
    this.userService.postData({page_no : this.page_number},'view_allmovies').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.mdata = result.result;
        
           for (let i = 0; i < this.mdata.length; i++) {
          this.content.push(this.mdata[i]);
        }
        console.log(this.content.length);
        console.log(result.total);
      if(this.content.length == result.total){
           this.is_more_records = false;
          }
        if (isFirstLoad)
          event.target.complete();

        this.page_number++;
   
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

  doInfinite(event) {
    this.viewdata(true, event);
  }

  doInfinite1(event) {
    this.getfdata(true, event);
  }


  getfdata(isFirstLoad, event){
    // this.userService.presentLoading();
    this.userService.postData({max_rate: this.max_rate, min_rate: this.min_rate, cats_name: this.cname,page_no : this.fpage_number},'view_filtersmovies').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
       //  this.content = result.result;
       // this.is_more_records_v = false;
       //  console.log(this.content.length);
  this.mdata = result.result;
        
           for (let i = 0; i < this.mdata.length; i++) {
          this.content.push(this.mdata[i]);
        }
        console.log(this.content.length);
        console.log(result.ftotal);
      if(this.content.length == result.ftotal){
           this.is_more_records_v = false;
          }
        if (isFirstLoad)
          event.target.complete();

        this.fpage_number++;
        
   
      }
     
        else{
        this.userService.presentToast('No results found! Please try after some time.','danger');
      
      }
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to fetch results, Please try again','danger');
    });
  }


}
