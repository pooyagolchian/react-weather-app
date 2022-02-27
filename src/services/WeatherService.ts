import { Weather, WeatherLocation } from '../model/Weather';
import { ENV_CONFIG } from '../EnvConfig';
import http from '../helper/http';

const ERROR_200: Error = new Error('Failed to read location data');

if (ENV_CONFIG.WEATHER_API_KEY === undefined) {
  throw new Error(
    'No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY'
  );
  console.log(
    'If data not loaded you need to set API key from  http://api.openweathermap.org'
  );
}

const keyQuery = `appid=${ENV_CONFIG.WEATHER_API_KEY}`;

const searchLocation = async (term: string) => {
  const result = await http.get<WeatherLocation>(
    `/weather?q=${term}&${keyQuery}`
  );

  // TODO: I am ready against nested if since it is ready to follow and kind of messy, but at the end it is up to you.
  if (result?.status !== 200) {
    throw ERROR_200;
  }

  return result;
};

const readWeather = async (locationId: number) => {
  const current = await http.get<Weather>(
    `${ENV_CONFIG.WEATHER_API_URL}/weather?id=${locationId}&${keyQuery}&units=metric`
  );

  if (current.status !== 200) {
    throw ERROR_200;
  }

  return current.data;
};

export const getIconUrl = (code: string): string => {
  return `http://openweathermap.org/img/wn/${code}.png`;
};

const readForecast = async (locationId: number) => {
  const forecast = await http.get<Weather[] | null>(
    `${ENV_CONFIG.WEATHER_API_URL}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`
  );

  if (forecast?.status !== 200) {
    throw ERROR_200;
  }

  return forecast?.data['list'];
};

const WeatherService = {
  searchLocation,
  readWeather,
  readForecast,
};

export default WeatherService;
