import { useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Horoscope from "./components/Horoscope";
import Loader from "./components/Loader";
import { useWeather } from "./hooks/useWeather";
import { Analytics } from "@vercel/analytics/react";
import heroImage from "./assets/hero-clima.jpg";
import "./App.css";

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
    fetchWeather(city);
  }, []);

  const handleSearch = async (query) => {
    setCity(query);
    await fetchWeather(query);
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
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

        <Horoscope />
      </main>

      <footer className="app-footer">
        <p>
          Cielovivo • Datos meteorológicos provistos por Open-Meteo
        </p>

        <p>
          Horóscopo provisto por Sigastra
        </p>

        <span>Diseñado y desarrollado por Mariano Moreyra</span>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;