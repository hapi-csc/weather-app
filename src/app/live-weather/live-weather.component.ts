import { Component, OnInit } from '@angular/core';
import { LiveWeatherService } from '../live-weather.service';
import { weatherData } from '../weather-response';
import { Subscription } from 'rxjs';
import { LocalizedString } from '@angular/compiler';

enum UpdateState {
  UNLOADED = -1,
  ERROR = 0,
  GOOD = 1,
  LOADING = 2,
}

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.css']
})
export class LiveWeatherComponent implements OnInit {

  private weatherSub: Subscription | null = null;
  data: weatherData | null = null;
  appState: UpdateState = UpdateState.UNLOADED;

  constructor(private weatherService: LiveWeatherService) {}

  ngOnInit(): void {
    this.appState = UpdateState.LOADING;
    this.weatherService.refresh();
    this.weatherSub = this.weatherService.getWeather().subscribe(weather => this.data = weather['current'] )
    this.appState = (this.data !== null) ? UpdateState.GOOD : UpdateState.ERROR;
  }

  private unixToHHMMSS() {
    let unix_timestamp = 1549312452
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2);

    console.log(formattedTime);
  }

  refresh(): void {
  }

  getLOAD(): UpdateState {
    return UpdateState.LOADING;
  }

  getGOOD(): UpdateState {
    return UpdateState.GOOD;
  }

}
