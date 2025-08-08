export type WeatherDescription = {
  main: string;
  description: string;
  icon: string;
};

export type ForecastDay = {
  date: string;
  minTemp: number;
  maxTemp: number;
  weather: WeatherDescription;
  humidity: number;
  wind: number;
};

export type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: WeatherDescription[];
};
