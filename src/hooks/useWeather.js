import { useState, useEffect } from "react";
import { getWeather } from "../services/WeatherService";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar el clima
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather();
      setWeather(data);
    } catch (err) {
      setError(err.message || "Error al obtener el clima");
    } finally {
      setLoading(false);
    }
  };

  // Cargar automáticamente al montar el hook
  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, loading, error, refetch: fetchWeather };
}
