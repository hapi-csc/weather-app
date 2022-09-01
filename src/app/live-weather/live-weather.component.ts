import { Component, OnInit } from '@angular/core';
import { LiveWeatherService } from '../live-weather.service';
import { WeatherResponse } from '../weather-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.css']
})
export class LiveWeatherComponent implements OnInit {

  private weatherSub: Subscription | null = null;
  weatherResp: WeatherResponse | null = null;

  constructor(private weatherService: LiveWeatherService) {}

  ngOnInit(): void {
    this.weatherService.refresh();
    this.weatherSub = this.weatherService.getWeather().subscribe(weather => this.weatherResp = weather )
  }

  isWeather(): boolean {
    return ( this.weatherResp && this.weatherResp["sys"]) ? true : false;
  }

  private kToF(k: number): number {
    return (k - 273.15) * 9.0 / 5.0 + 32;
  }

  getTemperatureF(): number | null {
    let temp = null;
    if  (this.isWeather()) {
      temp = Number(this.kToF(this.weatherResp!["main"]["temp"]).toPrecision(4));
    }
    return temp;
  }

  private unixToHHMMXX(unix_time: number): string {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var ampm = 'AM';
    var date = new Date(unix_time * 1000);
    var hours = date.getHours();
    if (hours > 12) {
      hours = hours - 12;
      ampm = 'PM';
    }
    var minutes = String(date.getMinutes());
    return hours + ':' + minutes.substring(-2) + ' ' + ampm;
  }

  getSunrise(): string | null {
    let sunrise = null;
    if(this.isWeather()) {
      sunrise = this.unixToHHMMXX(this.weatherResp!["sys"]["sunrise"]);
    }
    return sunrise;
  }

  getSunset(): string | null {
    let sunset = null;
    if(this.isWeather()) {
      sunset = this.unixToHHMMXX(this.weatherResp!["sys"]["sunset"]);
    }
    return sunset;
  }

  getWindSpeed(): number | null {
    let windspeed = null;
    if ( this.isWeather() ) {
      windspeed = this.weatherResp!["wind"]["speed"]
    }
    return windspeed;
  }

  getWindDirection(): number | null {
    let winddir = null;
    if ( this.isWeather() ) {
      winddir = this.weatherResp!["wind"]["deg"]
    }
    return winddir;
  }
}
