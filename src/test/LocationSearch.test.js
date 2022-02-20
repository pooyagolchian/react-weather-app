/* eslint-disable */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationSearch } from '../components/LocationSearch';


test('If search city and click on search location show on page', async () => {

  const addLocation = () => {
    const searchData = {
      coord: {
        lon: -74.006,
        lat: 40.7143,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      base: 'stations',
      main: {
        temp: -0.25,
        feels_like: -7.25,
        temp_min: -2.81,
        temp_max: 2.19,
        pressure: 1015,
        humidity: 36,
      },
      visibility: 10000,
      wind: {
        speed: 13.38,
        deg: 310,
        gust: 18.01,
      },
      clouds: {
        all: 75,
      },
      dt: 1645311004,
      sys: {
        type: 2,
        id: 2039034,
        country: 'US',
        sunrise: 1645271088,
        sunset: 1645310113,
      },
      timezone: -18000,
      id: 5128581,
      name: 'New York',
      cod: 200,
    };
  }
  render(<LocationSearch onSearch={addLocation} />);
  expect(await screen.findByRole('button', { name: /Search/i })).toBeDisabled();
  userEvent.type(screen.getByRole('textbox'), 'Tehran');
  expect(await screen.findByRole('button', { name: /Search/i })).toBeEnabled();
  userEvent.click(await  screen.findByRole('button', { name: /Search/i }));
});


