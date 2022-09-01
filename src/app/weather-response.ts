export interface WeatherResponse {
    "coord": {
      "lon": number,
      "lat": number,
    },
    "weather": [
      {
        "id": number,
        "main": string,
        "description": string,
        "icon": string,
      }
    ]
    "base": string,
    "main": {
      "temp": number,
      "feels_like": number,
      "temp_min": number,
      "temp_max": number,
      "pressure": number,
      "humidity": number,
    }
    "visibility": number,
    "wind": {
      "speed": number,
      "deg": number
    },
    "clouds": {
      "all": number,
    },
    "dt": number,
    "sys": {
      "type": number,
      "id": number,
      "country": string,
      "sunrise": number,
      "sunset": number
    },
    "timezone": number
    "id": number,
    "name": string,
    "cod": number
}

export const MOCK_RESPONSE: WeatherResponse = {
    "coord": {
        "lon": -91.1545,
        "lat": 30.4508
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 302.18,
        "feels_like": 307.33,
        "temp_min": 300.12,
        "temp_max": 303.65,
        "pressure": 1013,
        "humidity": 77
    },
    "visibility": 10000,
    "wind": {
        "speed": 2.57,
        "deg": 10
    },
    "clouds": {
        "all": 0
    },
    "dt": 1661995512,
    "sys": {
        "type": 2,
        "id": 2040881,
        "country": "US",
        "sunrise": 1661946054,
        "sunset": 1661992163
    },
    "timezone": -18000,
    "id": 4315588,
    "name": "Baton Rouge",
    "cod": 200
}