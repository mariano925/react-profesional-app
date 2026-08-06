import React from "react";

function WeatherCard({ city, temperature, description, wind, humidity, max, min }) {
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
      {/* 👇 mantenemos la palabra Condición y mostramos el texto con emoji */}
      <p>☁️ Condición: {description}</p>
      <p>💨 Viento: {wind} km/h</p>
      <p>💧 Humedad: {humidity}%</p>
      <p>🔼 Máxima: {max}°C</p>
      <p>🔽 Mínima: {min}°C</p>
    </div>
  );
}

export default WeatherCard;

