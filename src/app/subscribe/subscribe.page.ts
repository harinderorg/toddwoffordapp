import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../config';
import { UserService } from '../services/user/user.service';
import {  Router,ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event/event.service'; 

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
first_name:any;
 reg_exp:any;
  last_name:any;
  email:any;
  errors:any=['',null,undefined,false];
is_submit:boolean=false;
is_loaded:Boolean=false;
  constructor(public events1: EventService, 
   private router: Router, public userService: UserService,private ref: ChangeDetectorRef,   
    private activatedRoute: ActivatedRoute) { 
  	this.reg_exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit() {
  }

   submit(){
   	this.is_submit = true;
    
   if(this.errors.indexOf(this.email) >= 0 || !this.reg_exp.test(String(this.email).toLowerCase()) ||  this.errors.indexOf(this.first_name) >= 0 || this.errors.indexOf(this.last_name) >= 0 ){

 return false;
    }

    this.userService.presentLoading();

    

    var dict = {
      first_name : this.first_name,
      last_name : this.last_name,
      email : this.email
    }

   

    this.userService.postData(dict,'add_subscribe').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
       
        this.userService.presentToast('Subscribe successfully.','success');
        
        
      
            this.router.navigate(['/home']);
         
      }
      else{
        this.userService.stopLoading();
        this.userService.presentToast('Error while performing action! Please try after some time.','danger');
      }
    },
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Unable to performing action, Please try after some time.','danger');
    });
  }

}
