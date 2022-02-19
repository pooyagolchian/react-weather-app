import { useState } from 'react';

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch = ({ onSearch }: LocationSearchProps) => {
  const [locationSearch, setLocationSearch] = useState('');
  const disableSearch: boolean = locationSearch.trim() === '';

  const addLocation = (): void => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  const handleLocationSearch = (e) => {
    setLocationSearch(e.target.value);
    if (e.key === 'Enter') {
      addLocation();
    }
  };

  return (
    <>
      <div className="pb-2">
        <div className="row">
          <input
            placeholder="Add locations"
            className="col col-auto"
            type="text"
            value={locationSearch}
            onChange={handleLocationSearch}
            onKeyPress={handleLocationSearch}
          />
          <button
            className="btn btn-primary col col-auto mx-2"
            onClick={addLocation}
            disabled={disableSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};
