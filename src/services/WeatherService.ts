import { Weather, WeatherLocation } from "../model/Weather";
import { ENV_CONFIG } from '../EnvConfig'

const ERROR_200: Error = new Error("Failed to read location data")

// review: Just as suggestion you can notify user that API key is not defined
// and maybe a link to http://api.openweathermap.org
// since you have to check out the "console" to find out what is the issue

if (ENV_CONFIG.WEATHER_API_KEY === undefined) {
  throw new Error(
    "No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY"
  );
}

const keyQuery = `appid=${ENV_CONFIG.WEATHER_API_KEY}`;

export async function searchLocation(
  term: string
): Promise<WeatherLocation | undefined> {
  const result: Response = await fetch(`${ENV_CONFIG.WEATHER_API_URL}/weather?q=${term}&${keyQuery}`);

  if (result.status === 404) return undefined;

  if (result.status !== 200) {
    throw ERROR_200;
  }

  return await result.json();
}

export const readWeather = async (locationId: number): Promise<Weather> => {
  const current: Response = await fetch(
    `${ENV_CONFIG.WEATHER_API_URL}/weather?id=${locationId}&${keyQuery}&units=metric`
  );

  if (current.status !== 200) {
    throw ERROR_200;
  }

  return await current.json();
}

export const getIconUrl = (code: string): string => {
  return `http://openweathermap.org/img/wn/${code}.png`;
}

export const readForecast = async (locationId: number): Promise<Weather[]> => {
  const forecast: Response = await fetch(
    `${ENV_CONFIG.WEATHER_API_URL}/forecast?id=${locationId}&${keyQuery}&units=metric&cnt=8`
  );

  if (forecast.status !== 200) {
    throw ERROR_200;
  }

  return (await forecast.json()).list;
}
