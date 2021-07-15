import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubscribesliderPage } from '../subscribeslider/subscribeslider.page';
// import { RealtedarticlesPage } from '../realtedarticles/realtedarticles.page';
@NgModule({
  imports: [
  	CommonModule,
  	IonicModule.forRoot(),
  	RouterModule,
  	FormsModule,
  ],
  declarations: [
  	SubscribesliderPage,
    // RealtedarticlesPage
  ],
  exports: [
    SubscribesliderPage,
    // RealtedarticlesPage
  ]
})

export class SharedModule { }
