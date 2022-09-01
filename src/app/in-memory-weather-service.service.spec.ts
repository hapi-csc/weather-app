import { TestBed } from '@angular/core/testing';

import { InMemoryWeatherServiceService } from './in-memory-weather-service.service';

describe('InMemoryWeatherServiceService', () => {
  let service: InMemoryWeatherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryWeatherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
