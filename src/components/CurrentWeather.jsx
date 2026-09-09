import "./CurrentWeather.css";

// Convierte los grados del viento en una dirección cardinal
function getWindDirection(degrees) {
  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SO",
    "O",
    "NO",
  ];

  const index = Math.round(degrees / 45) % 8;

  return directions[index];
}

function CurrentWeather({
  city,
  temperature,
  apparentTemperature,
  description,
  wind,
  windDirection,
  humidity,
  pressure,
  uvIndex,
  max,
  min,
}) {
  return (
    <section className="current-weather">
      <div className="current-weather-header">
        <span className="current-weather-location">
          📍 {city}
        </span>
      </div>

      <div className="current-weather-main">
        <div>
          <span className="current-weather-temperature">
            {Math.round(temperature)}°
          </span>

          <p className="current-weather-description">
            {description}
          </p>

          <p className="current-weather-apparent">
            Sensación térmica: {Math.round(apparentTemperature)}°C
          </p>
        </div>

        <div className="current-weather-range">
          <span>↑ {Math.round(max)}°</span>
          <span>↓ {Math.round(min)}°</span>
        </div>
      </div>

      <div className="current-weather-metrics">
        <div className="weather-metric">
          <span>💨</span>
          <strong>
            {wind} km/h · {getWindDirection(windDirection)}
          </strong>
          <small>Viento</small>
        </div>

        <div className="weather-metric">
          <span>💧</span>
          <strong>{humidity}%</strong>
          <small>Humedad</small>
        </div>

        <div className="weather-metric">
          <span>◉</span>
          <strong>{uvIndex}</strong>
          <small>Índice UV</small>
        </div>

        <div className="weather-metric">
          <span>◌</span>
          <strong>{pressure} hPa</strong>
          <small>Presión</small>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;

