import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WeatherResponse } from './weather-response';


@Injectable({
  providedIn: 'root'
})
export class LiveWeatherService {

  private url: string = 'api/weather_response';
  private _weather$: Observable<WeatherResponse> | null;
  private _weatherSubj$: Subject<WeatherResponse>;

  constructor(private http: HttpClient) {
    this._weather$ = null;
    this._weatherSubj$ = new BehaviorSubject<WeatherResponse>({} as WeatherResponse);
    this.refresh();
  }

  refresh(): void {
    this._weather$ = this.http.get<WeatherResponse>(this.url);
    this._weather$.subscribe(weather => this._weatherSubj$.next(weather) )
  }

  getWeather(): Observable<WeatherResponse> {
    return this._weatherSubj$;
  }
}
