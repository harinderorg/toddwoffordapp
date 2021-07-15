import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { MoviedetailsPageRoutingModule } from './moviedetails-routing.module';

import { MoviedetailsPage } from './moviedetails.page';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    MoviedetailsPageRoutingModule
  ],
  declarations: [MoviedetailsPage]
})
export class MoviedetailsPageModule {}
