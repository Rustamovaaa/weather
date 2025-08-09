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

interface GeoCoords {
  lat: number;
  lon: number;
}

export const fetchForecast = async (city: string | GeoCoords): Promise<ForecastDay[]> => {
  const params: Record<string, string> = {
    appid: FORECAST_API_KEY,
    units: "metric"
  };

  // Handle different input types
  if (typeof city === 'string') {
    // Check if it's coordinates (lat,lon format)
    if (/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(city)) {
      const [lat, lon] = city.split(",");
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = city;
    }
  } else {
    // It's a GeoCoords object
    params.lat = city.lat.toString();
    params.lon = city.lon.toString();
  }

  const query = new URLSearchParams(params).toString();
  
  try {
    const res = await fetch(`${FORECAST_URL}?${query}`);
    const data: ForecastApiResponse = await res.json();
    
    if (!data.list || !Array.isArray(data.list)) {
      throw new Error("Invalid forecast data");
    }

    // Process 5-day forecast (data comes in 3-hour intervals)
    const forecastDays = processForecastData(data);
    return forecastDays;

  } catch (err) {
    console.error("Forecast fetch error:", err);
    throw new Error("Failed to fetch forecast data");
  }
};

// Helper to process the forecast data
function processForecastData(data: ForecastApiResponse): ForecastDay[] {
  const dayMap = new Map<string, ForecastDay>();
  
  // Process each forecast entry (3-hour intervals)
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (!dayMap.has(day)) {
      // Initialize a new day entry
      dayMap.set(day, {
        date: formatDate(date),
        minTemp: item.main.temp,
        maxTemp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
        weather: item.weather[0]
      });
    } else {
      // Update existing day entry
      const dayData = dayMap.get(day)!;
      dayData.minTemp = Math.min(dayData.minTemp, item.main.temp);
      dayData.maxTemp = Math.max(dayData.maxTemp, item.main.temp);
      
      // Average humidity & pick mid-day weather if possible
      dayData.humidity = (dayData.humidity + item.main.humidity) / 2;
      
      // If this reading is from noon, use its weather (more representative)
      if (date.getHours() === 12) {
        dayData.weather = item.weather[0];
      }
    }
  });
  
  // Convert Map to Array and limit to 5 days
  return Array.from(dayMap.values()).slice(0, 5);
}

// Format date to display day name and date
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}
