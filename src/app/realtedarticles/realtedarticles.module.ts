import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealtedarticlesPageRoutingModule } from './realtedarticles-routing.module';

import { RealtedarticlesPage } from './realtedarticles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealtedarticlesPageRoutingModule
  ],
  declarations: [RealtedarticlesPage]
})
export class RealtedarticlesPageModule {}
