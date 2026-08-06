// src/App.jsx
import {useLocalStorage} from "./hooks/useLocalStorage";
import ErrorMessage from "./components/ErrorMessage";
import  { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherService"; // 👈 Import correcto

function App() {
  const [city, setCity] = useLocalStorage("city", "Gualeguay");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setCity(query);
    try {
      const data = await getWeather(query);
      setWeather(data);
      setError(null);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>🌦️ Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {weather && (
        <WeatherCard
          city={city}
          temperature={weather.temperature}
          description={weather.description}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default App;
