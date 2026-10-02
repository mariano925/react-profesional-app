import { useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import AirQuality from "./components/AirQuality";
import Loader from "./components/Loader";
import { useWeather } from "./hooks/useWeather";
import { Analytics } from "@vercel/analytics/react";
import heroImage from "./assets/hero-clima.jpg";
import InstallBanner from "./components/InstallBanner";
import RiverLevels from "./components/RiverLevels";
import "./App.css";

const WEATHER_CLASSES = [
  "weather-clear",
  "weather-cloudy",
  "weather-rain",
  "weather-storm",
  "weather-night",
];

function getCurrentDayPeriod(timezone, sunrise, sunset) {
  if (!timezone || !sunrise || !sunset) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const timeParts = formatter.formatToParts(new Date());
  const hour = timeParts.find((part) => part.type === "hour")?.value;
  const minute = timeParts.find((part) => part.type === "minute")?.value;

  if (!hour || !minute) {
    return null;
  }

  const currentTime = `${hour}:${minute}`;
  const sunriseTime = sunrise.slice(11, 16);
  const sunsetTime = sunset.slice(11, 16);

  return currentTime >= sunriseTime && currentTime < sunsetTime
    ? "day"
    : "night";
}

function getWeatherClass(weather) {
  const { weatherCode, timezone, sunrise, sunset } = weather;
  const dayPeriod = getCurrentDayPeriod(timezone, sunrise, sunset);

  if (weatherCode >= 95 && weatherCode <= 99) {
    return "weather-storm";
  }

  if (
    (weatherCode >= 51 && weatherCode <= 67) ||
    (weatherCode >= 80 && weatherCode <= 82)
  ) {
    return "weather-rain";
  }

  if (dayPeriod === "night") {
    return "weather-night";
  }

  if (
    (weatherCode >= 2 && weatherCode <= 3) ||
    (weatherCode >= 45 && weatherCode <= 48) ||
    (weatherCode >= 71 && weatherCode <= 77) ||
    (weatherCode >= 85 && weatherCode <= 86)
  ) {
    return "weather-cloudy";
  }

  return "weather-clear";
}

function App() {
  const [city, setCity] = useLocalStorage("city", "Gualeguay");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const {
    weather,
    loading,
    error,
    fetchWeather,
  } = useWeather();

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const body = document.body;
    body.classList.remove(...WEATHER_CLASSES);

    if (!weather) {
      return;
    }

    const weatherClass = getWeatherClass(weather);
    body.classList.add(weatherClass);

    return () => {
      body.classList.remove(weatherClass);
    };
  }, [weather]);

  useEffect(() => {
    fetchWeather(city);
  }, [fetchWeather]);

  const handleSearch = async (query) => {
    const data = await fetchWeather(query);

    if (data) {
      setCity(query);
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <InstallBanner />

      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
        </button>
      </div>

      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>Cielovivo</h1>

          <p>
            El clima de un vistazo. Información meteorológica actualizada de
            cualquier ciudad.
          </p>

          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <main className="main-content">
        {loading && <Loader />}

        {error && <ErrorMessage message={error} />}

        {weather && <WeatherCard weather={weather} />}

        {weather?.aqi !== undefined && (
          <AirQuality aqi={weather.aqi} />
        )}

        <RiverLevels />
      </main>

      <footer className="app-footer">
        <p>
          Cielovivo • Datos meteorológicos de Open-Meteo • Niveles de ríos del
          Instituto Nacional del Agua (INA)
        </p>

        <span>Diseñado y desarrollado por Mariano Moreyra</span>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;

