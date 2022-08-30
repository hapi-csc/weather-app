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

  refresh(): void {
  }

  getLOAD(): UpdateState {
    return UpdateState.LOADING;
  }

  getGOOD(): UpdateState {
    return UpdateState.GOOD;
  }

}
