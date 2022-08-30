import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { weatherResponse } from './weather-response';

// TODO add config.json to create this url dynamically
const url = 'https://openweathermap.org/data/2.5/onecall?lat=30.4508&lon=-91.1545&units=imperial&appid=439d4b804bc8187953eb36d2a8c26a02'

@Injectable({
  providedIn: 'root'
})
export class LiveWeatherService {

  private _weather$: Observable<weatherResponse> | null;
  private weather$: Subject<weatherResponse>;

  constructor(private http: HttpClient) {
    this._weather$ = null;
    this.weather$ = new BehaviorSubject<weatherResponse>({} as weatherResponse);
    this.refresh();
  }

  refresh(): void {
    this._weather$ = this.http.get<weatherResponse>(url);
    this._weather$.subscribe(weather => this.weather$.next(weather) )
  }

  getWeather(): Observable<weatherResponse> {
    return this.weather$;
  }
}
