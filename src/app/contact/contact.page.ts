import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { EventService } from '../services/event/event.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
errors:any = ['',null,undefined];
is_loaded:Boolean=false;
content:any;
image:any;
IMAGES_URL:any=config.IMAGES_URL;
id:any;
data: any;
dates: any;
  constructor(public events1: EventService,
public userService:UserService,private router: Router,
private activatedRoute: ActivatedRoute) {
 this.viewdata();
  }

  ngOnInit() {
  }
  viewdata(){
    this.userService.presentLoading();
    this.userService.postData({id : 1},'view_contactdetails').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        this.content = result.result;
        console.log(this.content);
        
   
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
