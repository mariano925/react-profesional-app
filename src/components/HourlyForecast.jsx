import "./HourlyForecast.css";

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

function HourlyForecast({ hourly }) {
if (!hourly || hourly.length === 0) {
return null;
}

const now = new Date();

now.setMinutes(0);
now.setSeconds(0);
now.setMilliseconds(0);

const currentHourIndex = hourly.findIndex(
(hour) => new Date(hour.time) >= now
);

const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

return ( <section className="hourly-section"> <div className="hourly-header"> <h3>Pronóstico por hora</h3>


    <span className="hourly-scroll-hint">
      Deslizá para ver más →
    </span>
  </div>

  <div className="hourly-track">
    {hourly.slice(startIndex, startIndex + 24).map((hour) => (
      <div className="hourly-card" key={hour.time}>
        <strong>
          {new Date(hour.time).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>

        <span className="hourly-temperature">
          {Math.round(hour.temperature)}°
        </span>

        <span className="hourly-icon">
          {getWeatherIcon(hour.weatherCode)}
        </span>

        <span className="hourly-description">
          {hour.description}
        </span>

        <span className="hourly-rain">
          💧{hour.precipitationProbability}%
        </span>
      </div>
    ))}
  </div>
</section>


);
}

export default HourlyForecast;
