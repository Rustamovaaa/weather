import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudSun, Droplets, Wind, Eye, Thermometer, Gauge, Sunrise, Sunset, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { ForecastDay, WeatherData } from "@/types";
const iconMap = {
  Clear: { icon: Sun, color: "text-yellow-600" },
  Clouds: { icon: Cloud, color: "text-gray-400" },
  Rain: { icon: CloudRain, color: "text-blue-500" },
  Snow: { icon: Snowflake, color: "text-cyan-300" },
  Thunderstorm: { icon: CloudLightning, color: "text-purple-600" },
  Drizzle: { icon: CloudSun, color: "text-blue-300" },
};


type WeatherCardProps =
  | { weather: WeatherData; forecast?: false }
  | { weather: ForecastDay; forecast: true };


export const WeatherCard = (props: WeatherCardProps) => {
  let main: string, description: string, temp: number | undefined, minTemp: number | undefined, maxTemp: number | undefined, humidity: number, wind: number | undefined, city: string | undefined, date: string | undefined;

  if (props.forecast) {
    main = props.weather.weather.main;
    description = props.weather.weather.description;
    minTemp = props.weather.minTemp;
    maxTemp = props.weather.maxTemp;
    humidity = props.weather.humidity;
    wind = props.weather.wind;
    date = props.weather.date;
  } else {
    main = props.weather.weather[0].main;
    description = props.weather.weather[0].description;
    temp = props.weather.main.temp;
    humidity = props.weather.main.humidity;
    city = props.weather.name;
  }
  const Icon = (iconMap[main as keyof typeof iconMap]?.icon) || Sun;
  const color = (iconMap[main as keyof typeof iconMap]?.color) || "text-primary";
  const MotionIcon = motion(Icon);

  return (
    <motion.div
      className={`rounded-2xl shadow-xl bg-white/30 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-600/30 hover:shadow-2xl transition-all duration-300 hover:bg-white/40 dark:hover:bg-slate-700/50 w-full mx-auto ${props.forecast ? 'md:w-[220px] lg:w-[250px] xl:w-[220px]' : 'max-w-full sm:max-w-[340px] md:max-w-[380px]'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      layout
    >
      <CardHeader className={`pb-0 ${props.forecast ? 'pt-3 sm:pt-4' : 'pt-4 sm:pt-6'} text-center relative overflow-hidden`}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.3"/>
          </svg>
        </div>
        <CardTitle className={`${props.forecast ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-bold text-[#0EA5E9] mb-1 relative z-10`}>
          {city ? city : date}
        </CardTitle>
        <CardDescription className={`capitalize ${props.forecast ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-600 dark:text-slate-200 mb-1 sm:mb-2 font-medium relative z-10`}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={`flex flex-col items-center gap-1 sm:gap-2 ${props.forecast ? 'pb-3 sm:pb-4' : 'pb-4 sm:pb-6'} relative`}>
        <motion.div
          className={`relative ${props.forecast ? 'p-2 sm:p-3' : 'p-3 sm:p-4'} rounded-full bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-700/70 dark:to-slate-900/70 mb-1 sm:mb-2`}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <MotionIcon
            size={props.forecast ? 32 : 48}
            className={`${color} drop-shadow-xl`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
        {typeof temp === "number" && (
          <motion.div 
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-300 bg-clip-text text-transparent mb-1"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {temp}°C
          </motion.div>
        )}
        {typeof minTemp === "number" && typeof maxTemp === "number" && (
          <div className={`${props.forecast ? 'text-xs' : 'text-sm'} sm:text-base text-slate-600 dark:text-slate-300 bg-white/30 dark:bg-slate-700/50 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full`}>
            <span className="font-semibold text-blue-600 dark:text-blue-300 text-xl">{minTemp}°</span>
            <span className="mx-1 sm:mx-2 dark:text-slate-400">/</span>
            <span className="font-semibold text-red-600 dark:text-red-300 text-xl">{maxTemp}°C</span>
          </div>
        )}
        <div className="flex flex-row gap-2 sm:gap-3 mt-1 sm:mt-2">
          <div className={`${props.forecast ? 'text-[10px]' : 'text-xs'} sm:text-sm bg-white/30 dark:bg-slate-700/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-slate-600 dark:text-slate-300 flex items-center gap-1`}>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Droplets size={props.forecast ? 10 : 12} className="text-blue-500 dark:text-blue-300" />
            </motion.div>
            <span className="font-semibold text-md">{humidity}%</span>
          </div>
          {typeof wind === "number" && (
            <div className={`${props.forecast ? 'text-[10px]' : 'text-xs'} sm:text-sm bg-white/30 dark:bg-slate-700/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-slate-600 dark:text-slate-300 flex items-center gap-1`}>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Wind size={props.forecast ? 10 : 12} className="text-green-500 dark:text-green-300" />
              </motion.div>
              <span className="font-semibold">{wind} m/s</span>
            </div>
          )}
        </div>
      </CardContent>
    </motion.div>
  );
};
