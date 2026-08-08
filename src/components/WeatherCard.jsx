import React from "react";
import "./WeatherCard.css";

function WeatherCard({ city, temperature, description, wind, humidity, max, min, forecast, latitude, longitude }) {
  return (
    <div
      className="weather-card"
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        maxWidth: "300px",
        margin: "1rem auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>🌍 {city}</h2>
      <p>🌡️ Temperatura: {temperature}°C</p>
      <p>☁️ Condición: {description}</p>
      <p>💨 Viento: {wind} km/h</p>
      <p>💧 Humedad: {humidity}%</p>
      <p>🔼 Máxima: {max}°C</p>
      <p>🔽 Mínima: {min}°C</p>

      {/* 👇 Pronóstico extendido en formato grid */}
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
        <iframe
          width="100%"
          height="300"
          style={{ border: 0, marginTop: "1rem", borderRadius: "8px" }}
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=10&output=embed`}
          allowFullScreen
        />
      )}
    </div>
  );
}

export default WeatherCard;

