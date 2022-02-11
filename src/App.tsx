import React, { FC, useEffect, useState } from 'react';
import { LocationSearch } from './components/LocationSearch';
import { LocationTable } from './components/LocationTable';
import { WeatherSummery } from './components/WeatherSummery';
import { WeatherLocation } from './model/Weather';
import WeatherService from './services/WeatherService';

// TODO: since FC is gonna be remove from the nest version of the react it is better to do not use it anymore, here is the explanation:
// React.FC is unnecessary: it provides next to no benefits and has a few downsides. (See below.)
// I see a lot of beginners to TS+React using it, however, and I think that it's usage in this template is a contributing factor to that,
// as the prominence of this template makes it a de facto source of "best practice".
// https://github.com/facebook/create-react-app/pull/8177
const App: FC = () => {
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
      const location = (await WeatherService.searchLocation(term)).data;

      //TODO: you can also get rid of "else" here by breaking the code at that point
      /*
        if (!location) {
          return setError(`No location found called ${term}`);
        }

        if (locations.find((item) => item.id === location.id)) {
          return setWarning(`Location '${term}' is already in the list.`);
        }

        setLocations([location, ...locations]);
     */


      if (!location) {
        setError(`No location found called ${term}`);
      } else if (locations.find((item) => item.id === location.id)) {
        setWarning(`Location '${term}' is already in the list.`);
      } else {
        setLocations([location, ...locations]);
      }
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
    <div className="container">
      <h1>Weather App</h1>
      <LocationSearch onSearch={addLocation} />
      {error ? <div className={`alert alert-danger`}>{error}</div> : null}
      {warning ? <div className={`alert alert-warning`}>{warning}</div> : null}

      <LocationTable
        current={currentLocation}
        locations={locations}
        onSelect={(location: WeatherLocation) => setCurrentLocation(location)}
      />

      <WeatherSummery location={currentLocation} />
    </div>
  );
};

export default App;
