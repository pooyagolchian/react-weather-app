import React from "react";
import { Weather, WeatherConditions } from "../model/Weather";
import { getIconUrl } from "../services/WeatherService";

interface WeatherEntryProps {
  weather: Weather;
}
// review: Good job in terms of defining type however for more consistency
// you can use function expression everywhere like you used for defining component
function convertUnixTimeToDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000);
}

export const WeatherEntry = ({ weather }: WeatherEntryProps) => (
  // review: you can also destruct "weather" to make it shorter on usage
  // also "weather.weather" on line 32 does not make sense, could be like below:
  // const { weather, main: { temp, humidity, temp_max }, dt} = weather;

  <div>
    <div>{convertUnixTimeToDate(weather.dt).toLocaleTimeString()}</div>

    <div>
      <strong>{weather.main.temp}°C</strong>

      <div>
        ({weather.main.temp_min}°C / {weather.main.temp_max}°C)
      </div>
    </div>

    <div>Humidity: {weather.main.humidity}%</div>

    {weather.weather.map((condition: WeatherConditions) => (
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main} />{" "}
        {condition.main} {condition.description}
      </div>
    ))}
  </div>
);
