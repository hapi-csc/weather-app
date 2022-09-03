import { Component, OnInit } from '@angular/core';
import { LiveWeatherService } from '../live-weather.service';
import { WeatherResponse } from '../weather-response';
import { Subscription } from 'rxjs';
import { LocalTimeService } from '../local-time.service';

@Component({
  selector: 'app-live-weather',
  templateUrl: './live-weather.component.html',
  styleUrls: ['./live-weather.component.css']
})
export class LiveWeatherComponent implements OnInit {

  private weekdays: string[] = [];
  weatherResp: WeatherResponse | null = null;
  time: string | null = null;

  constructor(private weatherService: LiveWeatherService, private timeService: LocalTimeService) {}

  ngOnInit(): void {
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.weatherService.refresh();
    this.weatherService.getWeather().subscribe(weather => this.weatherResp = weather );
    this.timeService.getTime().subscribe(time => this.time = time);
  }

  isWeather(): boolean {
    return ( this.weatherResp && this.weatherResp["sys"]) ? true : false;
  }

  isTime(): boolean {
    return ( this.time ) ? true : false;
  }

  getDay(): string {
    if (this.isTime()) {
      // return this.weekdays[this.time!.getDay()];
    }
    return 'DayOfWeek';
  }

  getMDY(): string {
    if (this.isTime()) {
      // return '' + String(this.time!.getMonth()+1) + '/' + this.time!.getDate() + '/' + String(this.time!.getFullYear()).substring(-2);
    }
    return 'MM/DD/YY';
  }

  getTime(): string {
    if (this.isTime()) {
      // let hours = this.time!.getHours();
      // let minutes = this.time!.getMinutes();
      // let seconds = this.time!.getSeconds();
      // let sec = String(seconds);
      // let min = String(minutes);
      // if (hours == 0) hours = 12;
      // if (hours > 12) hours -= 12;
      // if (minutes < 10) min = '0' + min;
      // if (seconds < 10) sec = '0' + sec;
      // return '' + hours + ':' + min + ':' + sec;
    }
    return 'HH:MM:SS';
  }

  getMeridiem(): string {
    if (this.isTime()) {
      // return (this.time!.getHours() < 12) ? 'AM' : 'PM';
    }
    return '';
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
