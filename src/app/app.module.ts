import { NgModule ,Pipe, PipeTransform} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/CustomRequestOptions';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TruncateModule } from 'ng2-truncate';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpModule,TruncateModule],   
  providers: [ StatusBar,
    SplashScreen,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: RequestOptions, useClass: CustomRequestOptions }],
  bootstrap: [AppComponent],
})
export class AppModule {}
