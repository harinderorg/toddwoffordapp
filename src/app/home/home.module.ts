import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NgxStarsModule } from 'ngx-stars';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    HomePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HomePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class HomePageModule {}
