import { useCallback, useRef, useState } from "react";
import { getWeather } from "../services/weatherService";

export function useWeather() {
  const latestRequestId = useRef(0);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    const requestId = ++latestRequestId.current;
    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(city);

      if (requestId !== latestRequestId.current) {
        return;
      }

      setWeather(data);
      return data;
    } catch (err) {
      if (requestId === latestRequestId.current) {
        setError(err.message || "Error al obtener el clima");
        setWeather(null);
      }
    } finally {
      if (requestId === latestRequestId.current) {
        setLoading(false);
      }
    }
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeather,
  };
}

