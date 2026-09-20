import { useState } from "react";
import {
  getWeather,
  getWeatherByCoordinates,
} from "../services/weatherService";

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

      return data;
    } catch (err) {
      setError(err.message || "Error al obtener el clima");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (
    latitude,
    longitude
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCoordinates(
        latitude,
        longitude
      );

      setWeather(data);

      return data;
    } catch (err) {
      setError(err.message || "Error al obtener el clima");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoordinates,
  };
}