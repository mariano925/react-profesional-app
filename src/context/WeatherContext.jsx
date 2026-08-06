import { createContext, useState } from "react";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  return (
    <WeatherContext.Provider value={{ city, setCity, weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
