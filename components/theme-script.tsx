"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeScript() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Only set dark theme if no theme is already set
    if (typeof window !== 'undefined' && !localStorage.getItem('weather-theme')) {
      setTheme("dark");
    }
  }, [setTheme]);

  return null;
}
