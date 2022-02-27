import React, { useEffect, useState } from 'react';
import { LocationSearch } from './components/LocationSearch';
import { LocationTable } from './components/LocationTable';
import { WeatherSummery } from './components/WeatherSummery';
import { WeatherLocation } from './model/Weather';
import WeatherService from './services/WeatherService';

const App = () => {
  const localLocation: WeatherLocation[] = localStorage.getItem('location')
    ? JSON.parse(localStorage.getItem('location'))
    : [];
  const [locations, setLocations] = useState<WeatherLocation[]>(localLocation);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);

  const addLocation = async (term: string) => {
    try {
      resetAlert();
      const location = (await WeatherService.searchLocation(term))?.data;

      if (!location) {
        setError(`No location found called ${term}`);
      }

      if (locations.find((item) => item.id === location.id)) {
        setWarning(`Location '${term}' is already in the list.`);
      }

      setLocations([location, ...locations]);
    } catch (error) {
      console.error(error);

      setError(`No location found called ${term}`);
    }
  };

  useEffect(() => {
    localStorage.setItem('location', JSON.stringify([...locations]));
  }, [locations]);

  const resetAlert = () => {
    setError('');
    setWarning('');
  };

  return (
    <>
      <div className="container pt-5">
        <h1>Weather</h1>
        <LocationSearch onSearch={addLocation} />{' '}
        {error ? <div className={`alert alert-danger`}>{error}</div> : null}{' '}
        {warning ? (
          <div className={`alert alert-warning`}>{warning}</div>
        ) : null}
        <LocationTable
          current={currentLocation}
          locations={locations}
          onSelect={(location: WeatherLocation) => setCurrentLocation(location)}
        />{' '}
        <WeatherSummery location={currentLocation} />
      </div>
    </>
  );
};

export default App;
