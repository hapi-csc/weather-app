export interface weatherResponse {
    "lat": number,
    "lon": number,
    "timezone": string,
    "timezone_offset": number,
    "current": {
        "dt": number,
        "sunrise": number,
        "sunset": number,
        "temp": number,
        "feels_like": number,
        "pressure": number,
        "humidity": number,
        "dew_point": number,
        "uvi": number,
        "clouds": number,
        "visibility": number,
        "wind_speed": number,
        "wind_deg": number,
        "weather": any[], 
    },
    "minutely": any[],
    "hourly": any[],
}

export interface weatherData {
        "sunrise": number,
        "sunset": number,
        "temp": number,
        "wind_speed": number,
        "wind_deg": number,
}