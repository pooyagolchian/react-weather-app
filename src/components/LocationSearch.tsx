import { useState } from "react";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

// review: you can keep it more simple since it is obviously function component(FC)
export const LocationSearch = ({ onSearch } : LocationSearchProps) => {
  const [locationSearch, setLocationSearch] = useState("");

  // review: define type  const disableSearch: boolean = ...
  const disableSearch = locationSearch.trim() === "";

  // review: Define function return type
  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch("");
  };

  // review: Dont use type any, You can also handle it on tsconfig file like as "noImplicitAny": false"
  const handleLocationSearch = (e: any): any => {
    setLocationSearch(e.target.value);

    if (e.key === "Enter") {
      addLocation();
    }
  };

  return (
    <div>
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
    </div>
  );
};
