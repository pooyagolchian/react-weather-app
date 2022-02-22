import { Weather, WeatherLocation } from '../model/Weather';
import { ENV_CONFIG } from '../EnvConfig';
import http from '../helper/http';

const ERROR_200: Error = new Error('Failed to read location data');

// review: Just as suggestion you can notify user that API key is not defined
// and maybe a link to http://api.openweathermap.org
// since you have to check out the "console" to find out what is the issue

if (ENV_CONFIG.WEATHER_API_KEY === undefined) {
  throw new Error(
    'No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY'
  );
}

const keyQuery = `appid=${ENV_CONFIG.WEATHER_API_KEY}`;

const searchLocation = async (term: string) => {
  const result = await http.get<WeatherLocation>(
    `/weather?q=${term}&${keyQuery}`
  );

  // TODO: I am ready against nested if since it is ready to follow and kind of messy, but at the end it is up to you.
  if (result.status !== 404) {
    if (result.status !== 200) {
      throw ERROR_200;
    }

    return result;
  } else {
    return undefined;
  }
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

  /*
   TODO: Regarding the line 52, forecast could be null
    then you will get error exception on forecast.status.
    Use ?. to get rid of that
   */
  if (forecast.status !== 200) {
    throw ERROR_200;
  }

  // TODO same here as well, what if forecast is null?
  return forecast.data['list'];
};

const WeatherService = {
  searchLocation,
  readWeather,
  readForecast,
};

export default WeatherService;
