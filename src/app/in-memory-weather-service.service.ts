import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { WeatherResponse, MOCK_RESPONSE } from './weather-response';

@Injectable({
  providedIn: 'root'
})
export class InMemoryWeatherServiceService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const weather_response = MOCK_RESPONSE;
    return {weather_response};
  }
}
