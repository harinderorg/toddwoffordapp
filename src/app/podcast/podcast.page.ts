import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import {  Router,ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service';
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit {
  
filterTerm: string;
  public win: any = window;
  errors:any=['',null,undefined];
is_submit:boolean=false;
IMAGES_URL:any=config.IMAGES_URL;
is_loaded:Boolean=false;
content:any=[];
mdata:any=[];
is_more_records:boolean = true;
limit: number = 40;
page_number = 0;
  truncating = true;
allowedMimes:any=config.IMAGE_EXTENSIONS;
 constructor(public events1: EventService, 
   private router: Router, public userService: UserService,private ref: ChangeDetectorRef, 
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.viewdata(false, "");
  }

    viewdata(isFirstLoad, event){
    // this.userService.presentLoading();
    this.userService.postData({page_no : this.page_number},'view_allpodcasts').subscribe((result) => {
      this.userService.stopLoading();
      if(this.errors.indexOf(result.result) == -1){
        this.is_loaded = true;
        // this.content = result.result;
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

}
