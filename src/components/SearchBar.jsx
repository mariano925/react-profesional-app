import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, onLocation }) {
  const [query, setQuery] = useState("");
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery !== "") {
      onSearch(trimmedQuery);
      setQuery("");
      setLocationError("");
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Tu navegador no permite obtener la ubicación."
      );
      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocating(false);

        onLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        setLocating(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "No se permitió acceder a tu ubicación."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "No se pudo determinar tu ubicación."
            );
            break;

          case error.TIMEOUT:
            setLocationError(
              "La solicitud de ubicación tardó demasiado."
            );
            break;

          default:
            setLocationError(
              "No se pudo obtener tu ubicación."
            );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="city-search">Ciudad</label>

        <input
          id="city-search"
          type="text"
          placeholder="Ingresa una ciudad..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={locating}
        />

        <button
          type="submit"
          disabled={locating}
        >
          Buscar
        </button>
      </form>

      <button
        type="button"
        onClick={handleLocation}
        disabled={locating}
        aria-label="Usar mi ubicación actual"
      >
        {locating
          ? "📍 Obteniendo ubicación..."
          : "📍 Usar mi ubicación"}
      </button>

      {locationError && (
        <p role="alert" className="location-error">
          {locationError}
        </p>
      )}
    </div>
  );
}

export default SearchBar;