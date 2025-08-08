import { ForecastDay, WeatherDescription } from "@/types";


const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "209823e5c954b74fb3455928afd8cb28";

export const fetchWeather = async (city: string) => {
    const params: Record<string, string> = {
        appid: API_KEY,
        units: "metric"
    };
    if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(city)) {
        const [lat, lon] = city.split(",");
        params.lat = lat;
        params.lon = lon;
    } else {
        params.q = city;
    }
    const query = new URLSearchParams(params).toString();
    try {
        const res = await fetch(`${URL}?${query}`);
        const data = await res.json();
        if (data.cod && (data.cod === "404" || data.cod === 404)) {
            throw new Error("Not found");
        }
        return data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error("Weather fetch error");
    }
};


const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const FORECAST_API_KEY = "209823e5c954b74fb3455928afd8cb28";


interface ForecastApiItem {
  dt: number;
  main: { temp: number; humidity: number };
  weather: WeatherDescription[];
  wind: { speed: number };
}

interface ForecastApiResponse {
  list: ForecastApiItem[];
  city?: { name?: string };
}

export const fetchForecast = async (input: string | { lat: number; lon: number }): Promise<ForecastDay[]> => {
  const params: Record<string, string> = {
    appid: FORECAST_API_KEY,
    units: "metric"
  };
  if (typeof input === "string") {
    if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(input)) {
      const [lat, lon] = input.split(",");
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = input;
    }
  } else if (typeof input === "object" && input.lat && input.lon) {
    params.lat = String(input.lat);
    params.lon = String(input.lon);
  } else {
    throw new Error("Noto'g'ri argument: shahar nomi yoki lat/lon kerak");
  }
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${FORECAST_URL}?${query}`);
    const data: ForecastApiResponse = await res.json();
    if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
      throw new Error("Forecast not found");
    }
    // Group by day (YYYY-MM-DD)
    const dailyMap = new Map<string, ForecastApiItem[]>();
    data.list.forEach((item: ForecastApiItem) => {
      const dateObj = new Date(item.dt * 1000);
      const dayKey = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
      if (!dailyMap.has(dayKey)) {
        dailyMap.set(dayKey, []);
      }
      dailyMap.get(dayKey)!.push(item);
    });

    const forecasts: ForecastDay[] = Array.from(dailyMap.values()).slice(0, 7).map((items) => {
      const noonItem = items.reduce((prev, curr) => {
        const prevHour = new Date(prev.dt * 1000).getHours();
        const currHour = new Date(curr.dt * 1000).getHours();
        return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
      });
      const temps = items.map((i) => i.main.temp);
      const minTemp = Math.round(Math.min(...temps));
      const maxTemp = Math.round(Math.max(...temps));
      const dateObj = new Date(noonItem.dt * 1000);
      const date = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      return {
        date,
        minTemp,
        maxTemp,
        weather: noonItem.weather[0],
        humidity: noonItem.main.humidity,
        wind: noonItem.wind.speed
      };
    });

    return forecasts;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Forecast fetch error");
  }
};
