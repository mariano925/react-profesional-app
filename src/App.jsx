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
        💻 <strong>Nota de Front-End:</strong> ¿Cómo estructuramos esta evolución visual?<br /><br />
        
        🎨 <strong>Arquitectura de Estilos y Design Tokens:</strong> Desacoplamos por completo la lógica de los componentes de su apariencia visual utilizando <strong>Variables CSS (Custom Properties)</strong>. Esto actúa como un sistema de diseño centralizado: cambiar la identidad visual o la paleta de colores de toda la aplicación ahora toma segundos, sin alterar una sola línea de código estructural.<br /><br />
        
        ⚡ <strong>Gestión de Estado y Reactividad:</strong> El sistema de temas (Modo Claro/Oscuro) está integrado con un hook personalizado de persistencia (`localStorage`). Mediante un efecto (`useEffect`), sincronizamos dinámicamente la clase global en el DOM (`document.body`), garantizando que la transición de estilos sea fluida y reactiva en toda la pantalla.<br /><br />
        
        ✨ <strong>Evolución de UI/UX (Clean Glass):</strong> Pasamos de estructuras rígidas a una interfaz moderna con efectos de capas, desenfoques por hardware (`backdrop-filter`) y transiciones optimizadas, logrando una experiencia de usuario propia de una aplicación nativa.<br /><br />
        
        🏠 Dicho en otras palabras, remodelar el diseño de esta aplicación fue como redecorar una casa. En lugar de tener que cambiar de lugar o pintar cada mueble uno por uno a mano, simplemente actualizamos el "sistema eléctrico y de pintura central" (las variables). Así, toda la casa cambió su energía visual de forma armónica al mismo tiempo, sin tirar abajo ninguna pared y manteniendo intacta la estructura interna.<br /><br />
        
        🚀 <em>Construido con React, Vite y la API de Open-Meteo. Proyecto en constante evolución profesional.</em>
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
          ✍️ Creado por Mariano como proyecto de práctica profesional.
        </footer>
      </div>
    </WeatherProvider>
  );
}

export default App;