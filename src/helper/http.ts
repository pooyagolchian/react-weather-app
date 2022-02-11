import axios from 'axios';
import { ENV_CONFIG } from '../EnvConfig';

export default axios.create({
  baseURL: `${ENV_CONFIG.WEATHER_API_URL}`,
  headers: {
    'Content-type': 'application/json',
  },
});
