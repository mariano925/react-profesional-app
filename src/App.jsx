// src/App.jsx
import ErrorMessage from "./components/ErrorMessage";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather } from "./services/weatherService"; // 👈 Import correcto

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async (query) => {
    setCity(query);
    const data = await getWeather(query);
    setWeather(data);
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
    </div>
  );
}

export default App;
