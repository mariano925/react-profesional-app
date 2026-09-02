import { WeatherProvider } from "./context/WeatherContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import { useState, useEffect } from "react"; 
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

  // Aplica la clase al <body> para cambiar el fondo de toda la pantalla
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

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
      {/* Mantenemos la clase acá también por seguridad */}
      <div className={`App ${darkMode ? "dark" : ""}`}>
        
        {/* Botón para alternar Dark Mode con estilo Clean Glass */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "20px", // Bordes redondeados modernos
              border: "1px solid var(--border-color)",
              cursor: "pointer",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-main)",
              fontWeight: "500",
              fontFamily: "inherit",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)", // Sombra súper suave
              transition: "all 0.3s ease"
            }}
          >
            {darkMode ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
          </button>
        </div>

    {/* Banner superior con enfoque técnico y analogía al final */}
      <div className="banner">
        💻 <strong>Nota de desarrollo:</strong> ¿Cómo armé esta evolución visual?<br /><br />
        
        🎨 <strong>Arquitectura y Design Tokens:</strong> Separé por completo la lógica de los componentes de su estética usando <strong>Variables CSS (Custom Properties)</strong>. Armé un sistema centralizado que me permite cambiar toda la paleta de colores de la app en segundos y sin tocar la estructura del código.<br /><br />
        
        ⚡ <strong>Estado y Reactividad:</strong> El sistema de Modo Claro/Oscuro lo resolví con un hook personalizado de persistencia (`localStorage`) y un `useEffect` que sincroniza dinámicamente el `document.body`, logrando una transición fluida en toda la pantalla.<br /><br />
        
        ✨ <strong>UI/UX Clean Glass:</strong> Reemplacé las estructuras rígidas por una interfaz moderna con efectos de capas, desenfoques (`backdrop-filter`) y transiciones bien cuidadas para darle una sensación más fluida y profesional.<br /><br />
        
        🏠 Para explicarlo de forma simple: cambiarle el diseño a esta app fue como redecorar una casa. En lugar de tener que pintar o mover cada mueble a mano uno por uno, simplemente actualicé el sistema central de pintura e iluminación (las variables). Así, toda la casa renovó su onda al mismo tiempo sin romper ninguna pared y manteniendo la estructura intacta.<br /><br />
        
        🚀 <em>Desarrollado con React y la API de Open-Meteo. Proyecto en constante evolución.</em>
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
            latitude={weather.latitude}   
            longitude={weather.longitude} 
          />
        )}

        <footer>
          ✍️ Creado por Mariano como proyecto de práctica profesional 07/08/2026.
        </footer>
      </div>
    </WeatherProvider>
  );
}

export default App;