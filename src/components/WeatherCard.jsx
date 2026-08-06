// Muestra datos del clima (ciudad, temperatura, etc.)

import React from "react";

function WeatherCard({ city, temperature, description }) {
  return (
    <div>
      <h2>{city}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  )
}

export default WeatherCard