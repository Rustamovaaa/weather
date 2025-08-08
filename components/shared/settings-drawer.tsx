"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { motion } from "motion/react";
import { Settings as SettingsIcon } from "lucide-react";

export function SettingsDrawer() {
  const { theme, setTheme } = useTheme();
  const [city, setCity] = useState("");
  const [mounted, setMounted] = useState(false);

  // Ensure we only access theme on the client side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("defaultCity");
      if (savedCity) setCity(savedCity);
    }
  }, []);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("defaultCity", e.target.value);
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="fixed top-3 sm:top-4 right-3 sm:right-4 z-[100] bg-card border border-primary text-primary rounded-full px-3 sm:px-5 py-1.5 sm:py-2 shadow-lg hover:bg-blue-400 hover:text-white dark:hover:bg-primary dark:hover:text-background transition font-semibold flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <SettingsIcon className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">Settings</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full sm:w-[300px] md:w-[340px] fixed right-0 top-0 flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 border-l border-border shadow-2xl bg-gradient-to-br from-[#f0f4ff] via-[#e0e7ff] to-[#c7d2fe] dark:bg-gradient-to-br dark:from-[#232946] dark:via-[#1e293b] dark:to-[#3b3b5b]">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DrawerTitle className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-blue-500 dark:text-indigo-200 text-center drop-shadow-md">Settings</DrawerTitle>
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-semibold text-blue-500 dark:text-indigo-100">Dark mode</span>
              {mounted && (
                <Switch 
                  checked={theme === "dark"} 
                  onCheckedChange={handleThemeChange} 
                  className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-indigo-200 dark:data-[state=checked]:bg-indigo-400 dark:data-[state=unchecked]:bg-[#232946] border border-indigo-300 dark:border-indigo-600" 
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm sm:text-base font-semibold text-blue-500 dark:text-indigo-100">Default shahar</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={handleCityChange}
                className="border border-indigo-300 dark:border-indigo-600 rounded-lg px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-300 bg-white/80 dark:bg-[#232946]/80 dark:backdrop-blur-md text-indigo-900 dark:text-indigo-100 shadow-inner dark:shadow-[inset_0_2px_8px_0_rgba(30,41,59,0.5)] placeholder-indigo-400 dark:placeholder-indigo-300 transition-all duration-200 text-sm sm:text-base"
                placeholder="ex: New York"
              />
            </div>
          </div>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}