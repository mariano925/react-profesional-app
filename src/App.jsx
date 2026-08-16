import { WeatherProvider } from "./context/WeatherContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherService";
import Loader from "./components/Loader";

import "./App.css";
import "./index.css";

function App() {
  const [city, setCity] = useLocalStorage("city", "Gualeguay");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estado persistente para dark mode con botón
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

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
        {/* Botón para alternar Dark Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            margin: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: darkMode ? "#444" : "#ddd",
            color: darkMode ? "#fff" : "#000"
          }}
        >
          {darkMode ? "🌙 Modo Oscuro" : "🌞 Modo Claro"}
        </button>

      {/* Banner superior */}
      <div className="banner">
        👨‍🏫 <strong>Mini-clase de Desarrollo Web:</strong> ¿Qué magia técnica tiene este diseño?<br /><br />
        
        🏠 Imaginen que darle color a esta App es como iluminar una casa. Antes, para pasar a <strong>Modo Oscuro</strong>, había que ir habitación por habitación cambiando las luces a mano (escribiendo reglas repetidas para cada tarjeta).<br /><br />
        
        ⚡ <strong>La solución:</strong> Armamos un "Tablero Eléctrico Central" usando <strong>Variables CSS</strong>. Ahora, cuando tocan el botón del sol/luna, un solo interruptor le avisa a toda la casa que cambie la iluminación al mismo tiempo.<br /><br />
        
      🪟 Y para el toque final, instalamos "ventanas de vidrio empañado" (el efecto <em>Glassmorphism</em>) que deja asomar el degradado del fondo. ¡Todo hecho a medida, sin plantillas y haciendo equipo con IA para los detalles!<br /><br />
        
        🚀 <em>Construido con React y la API de Open-Meteo. Proyecto en constante evolución.</em>
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
            forecast={weather.forecast}
            latitude={weather.latitude}   // 👈 nuevo
            longitude={weather.longitude} // 👈 nuevo
          />
        )}

        <footer>
          ✍️ Creado por Mariano como proyecto de práctica profesional. 7/8/2026
        </footer>
      </div>
    </WeatherProvider>
  );
}

export default App;
