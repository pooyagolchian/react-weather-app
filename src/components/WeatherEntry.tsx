import React from 'react';
import { Weather, WeatherConditions } from '../model/Weather';
import { getIconUrl } from '../services/WeatherService';

interface WeatherEntryProps {
  weather: Weather;
}

const convertUnixTimeToDate = (unixUtc: number): Date => {
  return new Date(unixUtc * 1000);
};

export const WeatherEntry = ({ weather }: WeatherEntryProps) => {
  const {
    weather: weatherConditions,
    main: { temp, humidity, temp_max, temp_min },
    dt: dateTime,
  } = weather;

  return (
    <>
      <div>
        <div>{convertUnixTimeToDate(dateTime).toLocaleTimeString()}</div>
        <strong>{temp}°C</strong>
        <div>
          ({temp_min}°C / {temp_max}°C)
        </div>
        <div>Humidity: {humidity}%</div>
        {weatherConditions.map((condition: WeatherConditions) => (
          <div className="col col-auto" key={condition.id}>
            <img src={getIconUrl(condition.icon)} alt={condition.main} />
            <div>{condition.main}</div>
            <div>{condition.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};
