import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'subscribeslider',
    loadChildren: () => import('./subscribeslider/subscribeslider.module').then( m => m.SubscribesliderPageModule)
  },
  {
    path: 'moviedetails/:id',
    loadChildren: () => import('./moviedetails/moviedetails.module').then( m => m.MoviedetailsPageModule)
  },
  {
    path: 'realtedarticles',
    loadChildren: () => import('./realtedarticles/realtedarticles.module').then( m => m.RealtedarticlesPageModule)
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'podcast',
    loadChildren: () => import('./podcast/podcast.module').then( m => m.PodcastPageModule)
  },
  {
    path: 'podcastdetails/:id',
    loadChildren: () => import('./podcastdetails/podcastdetails.module').then( m => m.PodcastdetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
