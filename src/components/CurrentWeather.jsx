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

// Obtiene la hora local que entrega Open-Meteo
// sin convertirla a la zona horaria de la computadora.
function formatSolarTime(time) {
  return time ? time.slice(11, 16) : "--:--";
}

// Convierte el índice UV en una categoría comprensible.
function getUVLevel(uvIndex) {
  if (uvIndex < 3) return "Bajo";
  if (uvIndex < 6) return "Moderado";
  if (uvIndex < 8) return "Alto";
  if (uvIndex < 11) return "Muy alto";

  return "Extremo";
}

// Convierte la humedad relativa en una categoría comprensible.
function getHumidityLevel(humidity) {
  if (humidity < 30) return "Baja";
  if (humidity <= 60) return "Moderada";
  if (humidity <= 80) return "Alta";

  return "Muy alta";
}

// Obtiene la hora actual de la ciudad consultada.
function getCityCurrentTime(timezone) {
  if (!timezone) return null;

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(new Date());

  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.hour}:${values.minute}`;
}

// Determina si actualmente es de día o de noche
// usando el amanecer y el atardecer de la ciudad.
function getDayPeriod(timezone, sunrise, sunset) {
  const currentTime = getCityCurrentTime(timezone);

  if (!currentTime || !sunrise || !sunset) {
    return null;
  }

  const sunriseTime = sunrise.slice(11, 16);
  const sunsetTime = sunset.slice(11, 16);

  if (currentTime >= sunriseTime && currentTime < sunsetTime) {
    return "day";
  }

  return "night";
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
  sunrise,
  sunset,
  timezone,
}) {
  const dayPeriod = getDayPeriod(timezone, sunrise, sunset);

  return (
    <section className="current-weather">
      <div className="current-weather-header">
        <span className="current-weather-location">
          📍 {city}
        </span>

        {dayPeriod && (
          <span
            className="current-weather-day-period"
            aria-label={
              dayPeriod === "day"
                ? "Actualmente es de día"
                : "Actualmente es de noche"
            }
          >
            {dayPeriod === "day" ? "☀️ Día" : "🌙 Noche"}
          </span>
        )}
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
          <strong>
            {humidity}% · {getHumidityLevel(humidity)}
          </strong>
          <small>Humedad</small>
        </div>

        <div className="weather-metric">
          <span>◉</span>
          <strong>
            {uvIndex} · {getUVLevel(uvIndex)}
          </strong>
          <small>Índice UV</small>
        </div>

        <div className="weather-metric">
          <span>◌</span>
          <strong>{pressure} hPa</strong>
          <small>Presión</small>
        </div>

        <div className="weather-metric">
          <span>🌅</span>
          <strong>{formatSolarTime(sunrise)}</strong>
          <small>Amanecer</small>
        </div>

        <div className="weather-metric">
          <span>🌇</span>
          <strong>{formatSolarTime(sunset)}</strong>
          <small>Atardecer</small>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;