import "./Forecast.css";

// Convierte el código meteorológico en un ícono
function getWeatherIcon(code) {
  if (code === 0) return "☀️";

  if (code === 1 || code === 2) return "🌤️";

  if (code === 3) return "☁️";

  if (code === 45 || code === 48) return "🌫️";

  if (code >= 51 && code <= 67) return "🌧️";

  if (code >= 71 && code <= 86) return "🌨️";

  if (code >= 95 && code <= 99) return "⛈️";

  return "🌤️";
}

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const weekMin = Math.min(...forecast.map((day) => day.min));
  const weekMax = Math.max(...forecast.map((day) => day.max));

  const range = weekMax - weekMin || 1;

  return (
    <section className="forecast-section">
      <h3>📅 Próximos días</h3>

      <div className="forecast">
        {forecast.slice(1, 7).map((day) => {
          const start = ((day.min - weekMin) / range) * 100;
          const width = ((day.max - day.min) / range) * 100;

          return (
            <div key={day.date} className="forecast-day">
              <strong>
                {new Date(day.date).toLocaleDateString("es-AR", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </strong>

              <span className="forecast-icon">
                {getWeatherIcon(day.weatherCode)}
              </span>

              <div className="forecast-temperatures">
                <span>{Math.round(day.min)}°</span>
                <span>{Math.round(day.max)}°</span>
              </div>

              <div className="forecast-range">
                <div
                  className="forecast-range-bar"
                  style={{
                    marginLeft: `${start}%`,
                    width: `${width}%`,
                  }}
                />
              </div>

              <small>UV {day.uvIndex}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;