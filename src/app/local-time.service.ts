import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, ReplaySubject, Subscription, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LiveWeatherService } from './live-weather.service';

@Injectable({
  providedIn: 'root'
})
export class LocalTimeService {

  private timeZone: number = 0;
  private _time$: Observable<string>;
  private _timeSubj$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private weatherService: LiveWeatherService) {
    this.weatherService.getWeather().subscribe(w => this.timeZone = w['timezone']);
    this._time$ = timer(0, 1000).pipe(
      map(tick => new Date(new Date().getTime() + this.timeZone).toUTCString()),
      shareReplay(1),
    )
    this._time$.subscribe(t => this._timeSubj$.next(t));
  }

  getTime(): Observable<string> {
    return this._timeSubj$;
  }
}
