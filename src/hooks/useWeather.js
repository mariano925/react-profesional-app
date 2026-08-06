import { useState } from "react";
import { getWeather } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("No se pudo obtener el clima.");
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}
