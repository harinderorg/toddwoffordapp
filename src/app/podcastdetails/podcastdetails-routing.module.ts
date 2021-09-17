import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastdetailsPage } from './podcastdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PodcastdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastdetailsPageRoutingModule {}
