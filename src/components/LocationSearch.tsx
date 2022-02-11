import { useState } from 'react';

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

// review: you can keep it more simple since it is obviously function component(FC)
export const LocationSearch = ({ onSearch }: LocationSearchProps) => {
  const [locationSearch, setLocationSearch] = useState('');
  // review: define type  const disableSearch: boolean = ...
  // fixed
  const disableSearch: boolean = locationSearch.trim() === '';

  // review: Define function return type
  const addLocation = (): void => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  // review: Don't use type any, You can also handle it on tsconfig file like as "noImplicitAny": false"
  // fixed

  const handleLocationSearch = (e) => {
    setLocationSearch(e.target.value);
    if (e.key === 'Enter') {
      addLocation();
    }
  };

  // TODO: you can also use <></> instead of fragment
   return (
    <>
      <label>
        Add Location
        <input
          className="ml-1 mr-1 form-control"
          type="text"
          value={locationSearch}
          onChange={handleLocationSearch}
          onKeyPress={handleLocationSearch}
        />
      </label>
      <button
        className="btn btn-primary"
        onClick={addLocation}
        disabled={disableSearch}
      >
        Search
      </button>
    </>
  );
};
