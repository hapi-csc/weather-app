import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Mock DB imports */
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryWeatherServiceService } from './in-memory-weather-service.service';
/* --------------- */

import { AppComponent } from './app.component';
import { LiveWeatherComponent } from './live-weather/live-weather.component';

@NgModule({
  declarations: [
    AppComponent,
    LiveWeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot( InMemoryWeatherServiceService, { delay: 1500 } ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
