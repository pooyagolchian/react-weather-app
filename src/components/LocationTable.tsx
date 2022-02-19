import React from 'react';
import { WeatherLocation } from '../model/Weather';

interface LocationTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export const LocationTable = ({
  locations,
  current,
  onSelect,
}: LocationTableProps) => {
  return (
    <>
      <div className="col col-12">
        <div className="weather-table pt-2 row">
          <h2>Locations</h2>
          <div className="row">
            <ul className="col-auto">
              {locations.map((location: WeatherLocation) => (
                <li
                  key={location.id}
                  className={current?.id === location.id ? 'active-city' : ''}
                  onClick={() => onSelect(location)}
                >
                  <button className="btn btn-outline">{location.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
