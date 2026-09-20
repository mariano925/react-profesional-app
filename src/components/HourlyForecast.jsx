import React from "react";
import "./HourlyForecast.css";

// Convierte el código meteorológico y el momento del día
// en un ícono.
function getWeatherIcon(code, isDay) {
  // Cielo despejado
  if (code === 0) {
    return isDay ? "☀️" : "🌙";
  }

  // Mayormente / parcialmente despejado
  if (code === 1 || code === 2) {
    return isDay ? "🌤️" : "🌙";
  }

  // Nublado
  if (code === 3) return "☁️";

  // Niebla
  if (code === 45 || code === 48) return "🌫️";

  // Lluvia
  if (code >= 51 && code <= 67) return "🌧️";

  // Nieve
  if (code >= 71 && code <= 77) return "🌨️";

  // Chubascos de lluvia
  if (code >= 80 && code <= 82) return "🌧️";

  // Chubascos de nieve
  if (code >= 85 && code <= 86) return "🌨️";

  // Tormenta
  if (code >= 95 && code <= 99) return "⛈️";

  // Valor desconocido
  return isDay ? "🌤️" : "🌙";
}

// Obtiene la hora actual de la ciudad consultada
function getCityCurrentHour(timezone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(new Date());

  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.year}-${values.month}-${values.day}T${values.hour}:00`;
}

// Formatea una fecha local de Open-Meteo sin convertirla
// a la zona horaria de la computadora del usuario.
function formatDayLabel(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

function HourlyForecast({ hourly, timezone }) {
  if (!hourly || hourly.length === 0) {
    return null;
  }

  // Obtenemos la hora actual de la ciudad buscada,
  // no la hora local de la computadora del usuario.
  const cityCurrentHour = getCityCurrentHour(timezone);

  const currentHourIndex = hourly.findIndex(
    (hour) => hour.time >= cityCurrentHour
  );

  const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

  // Mostramos las próximas 24 horas como una única secuencia.
  const visibleHours = hourly.slice(startIndex, startIndex + 24);

  return (
    <section className="hourly-section">
      <div className="hourly-header">
        <h3>Pronóstico por hora</h3>

        <span className="hourly-scroll-hint">
          Deslizá para ver más →
        </span>
      </div>

      <div className="hourly-track">
        {visibleHours.map((hour, index) => {
          const currentDate = hour.time.slice(0, 10);

          const previousDate =
            index > 0
              ? visibleHours[index - 1].time.slice(0, 10)
              : null;

          // Detectamos cuándo empieza un nuevo día.
          const dayChanged =
            index === 0 || currentDate !== previousDate;

          return (
            <React.Fragment key={hour.time}>
              {dayChanged && (
                <div className="hourly-day-separator">
                  {formatDayLabel(currentDate)}
                </div>
              )}

              <div className="hourly-item">
                <div className="hourly-card">
                  <strong>{hour.time.slice(11, 16)}</strong>

                  <span className="hourly-temperature">
                    {Math.round(hour.temperature)}°
                  </span>

                  <span className="hourly-icon">
                    {getWeatherIcon(hour.weatherCode, hour.isDay)}
                  </span>

                  <span className="hourly-description">
                    {hour.description}
                  </span>

                  <span className="hourly-rain">
                    💧{hour.precipitationProbability}%
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;