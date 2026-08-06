import { WeatherProvider } from "./context/WeatherContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/WeatherService";
import Loader from "./components/Loader";

function App() {
  const [city, setCity] = useLocalStorage("city", "Gualeguay");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estado persistente para dark mode (queda, pero sin botón)
  const [darkMode] = useLocalStorage("darkMode", false);

  const handleSearch = async (query) => {
    setCity(query);
    setLoading(true);
    try {
      const data = await getWeather(query);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message || "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherProvider>
      <div className={`App ${darkMode ? "dark" : ""}`}>
        {/* Banner superior */}
        <div className="banner">
          ⚙️ Esta aplicación utiliza la API pública de <strong>Open‑Meteo</strong> para consultar el pronóstico.  
          Algunas ciudades pequeñas o con nombres similares pueden no estar disponibles en la base de datos.
        </div>

        <h1>🌦️ Weather App</h1>
        <h2>Tu pronóstico rápido y sencillo</h2>
        <p>
          Consulta el clima de tu ciudad en tiempo real.  
          Ingresa el nombre de la ciudad en la barra de búsqueda y obtén la temperatura y descripción actual.
        </p>

        <SearchBar onSearch={handleSearch} />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && (
          <WeatherCard
            city={weather.city}
            temperature={weather.temperature}
            description={weather.description}
            wind={weather.wind}
            humidity={weather.humidity}
            max={weather.max}
            min={weather.min}
          />
        )}

        <footer style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#555" }}>
          ✍️ Creado por Mariano como proyecto de práctica profesional
        </footer>
      </div>
    </WeatherProvider>
  );
}

export default App;
