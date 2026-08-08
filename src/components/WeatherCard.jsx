import React from "react";
import "./WeatherCard.css";

function WeatherCard({ city, temperature, description, wind, humidity, max, min, forecast, latitude, longitude }) {
  return (
    <div className="weather-card">
      <h2>🌍 {city}</h2>
      <p>🌡️ Temperatura: {temperature}°C</p>
      <p>☁️ Condición: {description}</p>
      <p>💨 Viento: {wind} km/h</p>
      <p>💧 Humedad: {humidity}%</p>
      <p>🔼 Máxima: {max}°C</p>
      <p>🔽 Mínima: {min}°C</p>

      {/* 📅 Pronóstico extendido */}
      {forecast && forecast.length > 0 && (
        <>
          <h3>📅 Próximos días</h3>
          <div className="forecast">
            {forecast.slice(1, 4).map((day, i) => (
              <div key={i} className="forecast-day">
                <strong>
                  {new Date(day.date).toLocaleDateString("es-AR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </strong>
                <p>{day.min}°C / {day.max}°C</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🗺️ Mapa de Google */}
      {latitude && longitude && (
        <>
          {/* Desktop: iframe */}
          <div className="map-desktop">
            <iframe
              width="100%"
              height="300"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&z=10&output=embed`}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Mobile: link */}
          <div className="map-mobile">
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}&z=10`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 Ver en Google Maps
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherCard;

