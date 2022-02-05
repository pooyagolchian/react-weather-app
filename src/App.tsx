import React, { FC, useState } from "react";
import { LocationSearch } from "./components/LocationSearch";
import { LocationTable } from "./components/LocationTable";
import { WeatherSummery } from "./components/WeatherSummery";
import { WeatherLocation } from "./model/Weather";
import { searchLocation } from "./services/WeatherService";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<WeatherLocation | null>(null);

  const addLocation = async (term: string) => {
    resetAlert();
    const location = await searchLocation(term);
    if (!location) {
      setError(`No location found called ${term}`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  const resetAlert = () => {
    setError("");
    setWarning("");
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
        onSelect={(location) => setCurrentLocation(location)}
      />
      <WeatherSummery location={currentLocation}/>
    </div>
  );
};

export default App;
