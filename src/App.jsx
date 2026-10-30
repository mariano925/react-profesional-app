
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useWeather } from "./hooks/useWeather";
import { registerVisit, subscribeToVisitCount } from "./services/visitCounter";

import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import AirQuality from "./components/AirQuality";
import Loader from "./components/Loader";
import InstallBanner from "./components/InstallBanner";
import RiverLevels from "./components/RiverLevels";

import { Analytics } from "@vercel/analytics/react";
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

  const [totalVisits, setTotalVisits] = useState(null);
  const [visitCounterError, setVisitCounterError] = useState(false);

  const { weather, loading, error, fetchWeather } = useWeather();

  // Conserva la ciudad inicial para cargarla una sola vez.
  const initialCity = useRef(city);

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
    fetchWeather(initialCity.current);
  }, [fetchWeather]);

  // Registra la visita y escucha el contador de Firebase.
  useEffect(() => {
    const unsubscribe = subscribeToVisitCount(
      (total) => {
        setTotalVisits(total);
        setVisitCounterError(false);
      },
      (firebaseError) => {
        console.error(
          "No se pudo consultar el contador de visitas:",
          firebaseError
        );
        setVisitCounterError(true);
      }
    );

    registerVisit().catch((firebaseError) => {
      console.error(
        "No se pudo registrar la visita:",
        firebaseError
      );
    });

    return unsubscribe;
  }, []);

  const handleSearch = async (query) => {
    const data = await fetchWeather(query);

    if (data) {
      setCity(query);
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <InstallBanner />

      <header className="app-header">
        <div className="app-header-top">
          <div className="app-brand">
            <h1>Cielovivo</h1>
            <p>El clima de un vistazo, para cualquier ciudad.</p>
          </div>

          <div className="theme-toggle">
            <button
              type="button"
              aria-pressed={darkMode}
              aria-label={
                darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
              }
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
            </button>
          </div>
        </div>

        <div className="app-header-search">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="main-content">
        <section
          className="weather-primary"
          aria-label="Información meteorológica principal"
        >
          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {weather && <WeatherCard weather={weather} />}
        </section>

        <section
          className="weather-complementary"
          aria-label="Información complementaria"
        >
          {weather?.aqi !== undefined && (
            <AirQuality aqi={weather.aqi} />
          )}

          <RiverLevels />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Cielovivo • Datos meteorológicos de Open-Meteo • Niveles de ríos del
          Instituto Nacional del Agua (INA)
        </p>

        <p className="visit-counter" aria-live="polite">
          {totalVisits !== null
            ? `Visitas registradas: ${totalVisits.toLocaleString("es-AR")}`
            : visitCounterError
              ? "Contador de visitas no disponible"
              : "Cargando visitas..."}
        </p>

        <span>Diseñado y desarrollado por Mariano Moreyra</span>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
