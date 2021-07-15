import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { PodcastPageRoutingModule } from './podcast-routing.module';

import { PodcastPage } from './podcast.page';
import { NgxStarsModule } from 'ngx-stars';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    Ng2SearchPipeModule,
    PodcastPageRoutingModule
  ],
  declarations: [PodcastPage]
})
export class PodcastPageModule {}
