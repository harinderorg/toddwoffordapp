import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { PodcastdetailsPageRoutingModule } from './podcastdetails-routing.module';

import { PodcastdetailsPage } from './podcastdetails.page';
import { NgxStarsModule } from 'ngx-stars';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    PodcastdetailsPageRoutingModule
  ],
  declarations: [PodcastdetailsPage]
})
export class PodcastdetailsPageModule {}
