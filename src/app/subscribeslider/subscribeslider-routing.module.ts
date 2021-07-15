import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribesliderPage } from './subscribeslider.page';

const routes: Routes = [
  {
    path: '',
    component: SubscribesliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribesliderPageRoutingModule {}
