export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherLocation {
  coordination: Coordinates;
  id: number;
  name: string;
}

export interface WeatherConditions {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Weather {
  weather: WeatherConditions[];
  main: MainWeatherData;
  // review: Explicit is better than implicit, check otu link below
  // https://github.com/ryanmcdermott/clean-code-javascript#avoid-mental-mapping
  dt: number;
}
