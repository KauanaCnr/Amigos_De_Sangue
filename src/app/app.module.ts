import { AuthguardService } from './servicos/auth/authguard.service';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Network } from '@ionic-native/network/ngx';
import { AppComponent } from './app.component';
import { HttpConfigInterceptorService } from './servicos/httpConfig.interceptor/http-config.interceptor.service';
import { AuthenticationService } from './servicos/auth/authentication.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgModule.forRoot(),
  ],

  providers: [
    ErrorHandler,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    Network,
    AuthenticationService,
    AuthguardService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptorService,
      multi: true
    },
    File,
    Swiper,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {


}
