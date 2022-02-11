import React from 'react';
import { Weather, WeatherConditions } from '../model/Weather';
import { getIconUrl } from '../services/WeatherService';

interface WeatherEntryProps {
  weather: Weather;
}

// review: Good job in terms of defining type however for more consistency
// you can use function expression everywhere like you used for defining component
const convertUnixTimeToDate = (unixUtc: number): Date => {
  return new Date(unixUtc * 1000);
};

export const WeatherEntry = ({weather}: WeatherEntryProps) => {
  // review: you can also destruct "weather" to make it shorter on usage
  // also "weather.weather" on line 32 does not make sense, could be like below:
  const { weather: weatherConditions , main: { temp, humidity, temp_max, temp_min}, dt: date} = weather;

  return <div>
    <div>{convertUnixTimeToDate(date).toLocaleTimeString()}</div>

    <div>
      <strong>{temp}°C</strong>

      <div>
        ({temp_min}°C / {temp_max}°C)
      </div>
    </div>

    <div>Humidity: {humidity}%</div>

    {weatherConditions.map((condition: WeatherConditions) => (
      <div key={condition.id}>
        <img src={getIconUrl(condition.icon)} alt={condition.main} />{' '} {condition.main} {condition.description}
      </div>
    ))}
  </div>
}
