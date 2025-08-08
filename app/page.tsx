"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WeatherCard } from "@/components/shared/weather-card";
import { ForecastDay, WeatherData } from "@/types";
import { fetchForecast, fetchWeather } from "./api/fetch-weather";
import { SettingsDrawer } from "@/components/shared/settings-drawer";
import { ErrorToast } from "@/components/shared/error-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const savedCity = typeof window !== "undefined" ? localStorage.getItem("defaultCity") : null;
    if (savedCity) {
      setQuery(savedCity);
      setLoading(true);
      Promise.all([
        fetchWeather(savedCity),
        fetchForecast(savedCity)
      ])
        .then(([data, forecastData]) => {
          setWeatherData(data);
          setForecast(forecastData);
          setError(null);
        })
        .catch(() => {
          setError("The city was not found or the weather data is unavailable.");
          setErrorVisible(true);
        })
        .finally(() => setLoading(false));
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          try {
            const [data, forecastData] = await Promise.all([
              fetchWeather(`${lat},${lon}`),
              fetchForecast({ lat, lon })
            ]);
            setWeatherData(data);
            setForecast(forecastData);
            setError(null);
          } catch {
            setError("Something went wrong.");
          }
          setLoading(false);
        },
        () => {
          setError("Location permission denied or not found.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    setLoading(true);
    let city = query.trim();
    if (!city) return setLoading(false);
    try {
      const [data, forecastData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city)
      ]);
      setWeatherData(data);
      setForecast(forecastData);
      setError(null);
    } catch {
      setError("Something went wrong");
    }
    setQuery("");
    setLoading(false);
  };
  
  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
      {/* Parallax Sky Background */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Static base gradient for both modes */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />

        {/* Bottom mountains (bigger) - responsive height */}
        <svg className="absolute bottom-0 left-0 w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[38vh]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,320 L160,260 L320,300 L520,210 L720,310 L910,230 L1120,290 L1280,240 L1440,280 L1440,400 L0,400 Z" fill="url(#mtn)" />
        </svg>
      </div>
      <SettingsDrawer />
      <div className="flex flex-col items-center pt-14 sm:pt-16 md:pt-18 pb-20 min-h-screen overflow-y-auto overflow-x-hidden relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-[#0EA5E9] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#a5b4fc] dark:via-[#818cf8] dark:to-[#38bdf8] drop-shadow-lg tracking-tight text-center px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to the Weather App
        </motion.h2>
        <motion.input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
          className="w-full max-w-[320px] h-12 px-5 py-2 rounded-2xl border-2 border-[#0EA5E9] dark:border-indigo-500 shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] dark:focus:ring-indigo-400 transition-all mb-3 bg-white/80 dark:bg-[#232946]/80 dark:backdrop-blur-md text-blue-900 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-300 shadow-inner dark:shadow-[inset_0_2px_12px_0_rgba(30,41,59,0.5)] backdrop-blur-md"
          style={{ marginBottom: 10 }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        {/* Quick city chips */}
        {!loading && (
          <div className="flex flex-wrap justify-center gap-2 mb-2 px-2">
            {["Tashkent","Samarkand","Bukhara","Namangan"].map((c) => (
              <button key={c} onClick={async ()=>{
                setQuery(c);
                const [data, forecastData] = await Promise.all([
                  fetchWeather(c),
                  fetchForecast(c)
                ]);
                setWeatherData(data);
                setForecast(forecastData);
                setError(null);
              }} className="px-3 py-1 rounded-full text-sm border border-[#0EA5E9]/40 text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition bg-white/70 backdrop-blur dark:bg-[#232946]/60 dark:text-indigo-200 dark:border-indigo-500/50 dark:hover:bg-indigo-500 dark:hover:text-white">
                {c}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              className="flex items-center gap-2 text-[#0EA5E9] text-lg font-semibold mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <motion.span
                className="inline-block w-6 h-6 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin"
                style={{ borderTopColor: 'transparent' }}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              Yuklanmoqda...
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!loading && error && (
            <motion.div
              key="error"
              className="text-red-500 text-lg font-semibold mt-4 bg-red-50 border border-red-200 px-6 py-3 rounded-xl shadow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!loading && !error && weatherData && (
            <motion.div
              key="weather"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-4 sm:mb-6 mt-2 sm:mt-4 relative px-4 w-full">
                <div className="absolute -inset-4 sm:-inset-6 blur-2xl bg-[#0EA5E9]/20 dark:bg-indigo-500/20 rounded-[28px]" aria-hidden />
                <motion.div className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-[380px]" layoutId="main-weather">
                  <WeatherCard weather={weatherData} forecast={false} />
                </motion.div>
              </div>
              {forecast.length > 0 && (
                <motion.div 
                  className="w-full mx-auto overflow-x-hidden flex justify-center" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.2 }}
                >
                  {/* Mobile: Vertical layout, Tablet/Desktop: Optimized grid layout */}
                  <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row gap-4 xl:gap-3 pb-2 py-2 md:place-items-center md:place-content-center md:justify-items-center w-full px-4 max-w-4xl mx-auto">
                    {forecast.map((day, i) => (
                      <motion.div
                        key={i}
                        className="flex-shrink-0 w-full md:w-auto mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                      >
                        <WeatherCard weather={day} forecast={true} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}