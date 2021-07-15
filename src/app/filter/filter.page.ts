import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams} from '@ionic/angular';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  cname:any ;
  selectedArray :any=[];
  alldata :any=[];
rating:any;
 cbox: any;
 min_rate: any;
 max_rate: any;
  constructor(public modalController: ModalController, public navParams: NavParams) {
 this.min_rate = 1;
    this.max_rate = 5;
var filters = navParams.get('filters');
// console.log(cbox); 
console.log(filters); 
console.log(filters.rate); 
this.min_rate = filters.min_rate;
this.max_rate = filters.max_rate;
this.cbox = filters.cbox;
this.selectedArray =filters.categories;
 this.rating = {lower: this.min_rate, upper: this.max_rate};
            console.log(this.selectedArray);
 }

  
  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }
  ngOnInit() {

  }

  rateChanged(event){
    this.min_rate = event.detail.value.lower;
    this.max_rate = event.detail.value.upper;
    console.log('price')
    console.log(event.detail.value)
  }

 catChanged(event,name){
    var self = this;
    setTimeout(function(){
      if(self.selectedArray.indexOf(name) == -1){
        self.selectedArray.push(name);
      }
      else{
        self.selectedArray.splice(self.selectedArray.indexOf(name),1);
      }
      console.log(self.selectedArray)
    },500);
  }
 
 

  async closeModal(data={}) {
    await this.modalController.dismiss(data);
  }

    applyFilters(){
 //    this.selectedArray =  this.cbox.filter(value => {
 //   return value.checked;
 // });
 // console.log(this.selectedArray);
 
    var data = {};
    data['applied'] = '1';
     data['min_rate'] = this.min_rate;
    data['max_rate'] = this.max_rate;
    // data['rating'] = this.rating;
    data['categories'] = this.selectedArray;
    this.closeModal(data);
  }

clearFilters(){
    var data = {};
    
    data['reset'] = '1';
    this.closeModal(data);
  }

}
