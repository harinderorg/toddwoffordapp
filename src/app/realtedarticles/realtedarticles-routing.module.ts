import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RealtedarticlesPage } from './realtedarticles.page';

const routes: Routes = [
  {
    path: '',
    component: RealtedarticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealtedarticlesPageRoutingModule {}
