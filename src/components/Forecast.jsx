import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Forecast.css";

// Convierte el código en ícono
function getWeatherIcon(code) {
  if (code === 0) return "☀️";

  if (code === 1 || code === 2) return "🌤️";

  if (code === 3) return "☁️";

  if (code === 45 || code === 48) return "🌫️";

  if (code >= 51 && code <= 67) return "🌧️";

  // Nieve
  if (code >= 71 && code <= 77) return "🌨️";

  // Chubascos
  if (code >= 80 && code <= 82) return "🌧️";

  // Chubascos de nieve
  if (code >= 85 && code <= 86) return "🌨️";

  if (code >= 95 && code <= 99) return "⛈️";

  return "🌤️";
}

// Formatea la fecha
function formatForecastDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("es-AR", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function Forecast({ forecast }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  // Avanza un día
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Retrocede un día
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  // Sin pronóstico
  if (!forecast || forecast.length === 0) {
    return null;
  }

  // Próximos 6 días
  const visibleForecast = forecast.slice(1, 7);

  // Sin días visibles
  if (visibleForecast.length === 0) {
    return null;
  }

  // Escala térmica
  const weekMin = Math.min(
    ...visibleForecast.map((day) => day.min)
  );

  const weekMax = Math.max(
    ...visibleForecast.map((day) => day.max)
  );

  const range = weekMax - weekMin || 1;

  return (
    <section className="forecast-section">
      <div className="forecast-header">
        <h3>📅 Próximos días</h3>

        <div className="forecast-controls">
          <button
            type="button"
            className="forecast-control"
            onClick={scrollPrev}
            aria-label="Ver días anteriores"
          >
            ←
          </button>

          <button
            type="button"
            className="forecast-control"
            onClick={scrollNext}
            aria-label="Ver días siguientes"
          >
            →
          </button>
        </div>
      </div>

      <div className="forecast-viewport" ref={emblaRef}>
        <div className="forecast">
          {visibleForecast.map((day) => {
            const start = ((day.min - weekMin) / range) * 100;
            const width = ((day.max - day.min) / range) * 100;

            return (
              <div key={day.date} className="forecast-day">
                <strong>{formatForecastDate(day.date)}</strong>

                <span className="forecast-icon">
                  {getWeatherIcon(day.weatherCode)}
                </span>

                <div className="forecast-temperatures">
                  <span>{Math.round(day.min)}°</span>
                  <span>{Math.round(day.max)}°</span>
                </div>

                <div className="forecast-rain">
                  🌧️ Lluvia prevista:{" "}
                  {Number(day.rain ?? 0).toFixed(1)} mm
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
      </div>
    </section>
  );
}

export default Forecast;