import React, { useEffect, useState } from "react";
import { Weather, WeatherLocation } from "../model/Weather";
import { readForecast, readWeather } from "../services/WeatherService";
import { WeatherEntry } from "./WeatherEntry";
import "./WeatherSummary.scss";

interface WeatherSummaryProps {
  location: WeatherLocation | null;
}

export const WeatherSummery = ({location}: WeatherSummaryProps) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (!location) {
        return
      }

      const [weather, forecast] = await Promise.all([
        readWeather(location.id),
        readForecast(location.id),
      ]);

      setWeather(weather);
      setForecast(forecast);
    })();
  }, [location]);

  if (!location || !weather || !forecast) return null;

  return (
    <div>
      <hr />
      <h2>{location.name}</h2>

      <WeatherEntry weather={weather} />

      <h2>Forecast</h2>

      <div>
        <ol>
          {forecast.map((timePoint: Weather) => (
            <li className="col col-auto" key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
