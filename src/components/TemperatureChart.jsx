import React from "react";
import "./TemperatureChart.css";

function TemperatureChart({ hourly, timezone }) {
  if (!hourly || hourly.length === 0) return null;

  // Tomamos las próximas 24 horas disponibles.
  const visibleHours = hourly.slice(0, 24);

  const temperatures = visibleHours.map((hour) => hour.temperature);

  const minTemperature = Math.min(...temperatures);
  const maxTemperature = Math.max(...temperatures);

  // Evita una división por cero cuando todas las temperaturas son iguales.
  const temperatureRange = maxTemperature - minTemperature || 1;

  const chartWidth = 800;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingY = 35;

  const getX = (index) => {
    if (visibleHours.length === 1) return chartWidth / 2;

    return (
      paddingX +
      (index / (visibleHours.length - 1)) *
        (chartWidth - paddingX * 2)
    );
  };

  const getY = (temperature) => {
    return (
      chartHeight -
      paddingY -
      ((temperature - minTemperature) / temperatureRange) *
        (chartHeight - paddingY * 2)
    );
  };

  const points = visibleHours
    .map((hour, index) => {
      return `${getX(index)},${getY(hour.temperature)}`;
    })
    .join(" ");

  return (
    <section className="temperature-chart">
      <div className="temperature-chart-header">
        <div>
          <h3>📈 Evolución de la temperatura</h3>
          <p>Próximas 24 horas</p>
        </div>

        {timezone && (
          <span className="temperature-chart-range">
            {Math.round(minTemperature)}° — {Math.round(maxTemperature)}°
          </span>
        )}
      </div>

      <div className="temperature-chart-wrapper">
        <svg
          className="temperature-chart-svg"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label={`Evolución de la temperatura durante las próximas 24 horas. Mínima ${Math.round(
            minTemperature
          )} grados y máxima ${Math.round(maxTemperature)} grados.`}
        >
          {/* Línea horizontal de referencia */}
          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            className="temperature-chart-axis"
          />

          {/* Línea de temperatura */}
          <polyline
            points={points}
            fill="none"
            className="temperature-chart-line"
          />

          {/* Puntos de temperatura */}
          {visibleHours.map((hour, index) => {
            const x = getX(index);
            const y = getY(hour.temperature);

            return (
              <circle
                key={hour.time}
                cx={x}
                cy={y}
                r="4"
                className="temperature-chart-point"
              />
            );
          })}

          {/* Etiquetas de temperatura */}
          {visibleHours.map((hour, index) => {
            // Mostramos una etiqueta cada 3 horas para evitar saturación.
            if (index % 3 !== 0 && index !== visibleHours.length - 1) {
              return null;
            }

            const x = getX(index);
            const y = getY(hour.temperature);

            return (
              <g key={`label-${hour.time}`}>
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  className="temperature-chart-value"
                >
                  {Math.round(hour.temperature)}°
                </text>

                <text
                  x={x}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  className="temperature-chart-time"
                >
                  {hour.time.slice(11, 16)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

export default TemperatureChart;