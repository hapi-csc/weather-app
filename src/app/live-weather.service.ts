import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { weatherResponse } from './weather-response';

// TODO add config.json to create this url dynamically
const url = 'https://api.openweathermap.org/data/2.5/weather';

interface HttpOptions {
  headers: HttpHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class LiveWeatherService {

  private _weather$: Observable<weatherResponse> | null;
  private weather$: Subject<weatherResponse>;
  private httpOptions: HttpOptions = {
    headers: new HttpHeaders({ 
      'q': 'Baton Rouge',
      'appid': '913e36517ce80d01b33a35a3980ea586',
  })
  };

  constructor(private http: HttpClient) {
    this._weather$ = null;
    this.weather$ = new BehaviorSubject<weatherResponse>({} as weatherResponse);
    this.refresh();
  }

  refresh(): void {
    this._weather$ = this.http.get<weatherResponse>(url, this.httpOptions);
    this._weather$.subscribe(weather => this.weather$.next(weather) )
  }

  getWeather(): Observable<weatherResponse> {
    return this.weather$;
  }
}
