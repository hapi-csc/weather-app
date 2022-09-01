import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { WeatherResponse } from './weather-response';

const url = 'api/weather_response';

interface HttpOptions {
  headers: HttpHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class LiveWeatherService {

  private _weather$: Observable<WeatherResponse> | null;
  private weather$: Subject<WeatherResponse>;
  private httpOptions: HttpOptions = {
    headers: new HttpHeaders({ 
      'q': 'Baton Rouge',
      'appid': '913e36517ce80d01b33a35a3980ea586', //not live, just an example... will be handled by backend
  })
  };

  constructor(private http: HttpClient) {
    this._weather$ = null;
    this.weather$ = new BehaviorSubject<WeatherResponse>({} as WeatherResponse);
    this.refresh();
  }

  refresh(): void {
    this._weather$ = this.http.get<WeatherResponse>(url);
    this._weather$.subscribe(weather => this.weather$.next(weather) )
  }

  getWeather(): Observable<WeatherResponse> {
    return this.weather$;
  }
}
