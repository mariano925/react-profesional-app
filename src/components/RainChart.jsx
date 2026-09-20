import React from "react";
import "./RainChart.css";

function RainChart({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  // Tomamos las próximas 24 horas disponibles.
  const visibleHours = hourly.slice(0, 24);

  const chartWidth = 800;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartAreaHeight =
    chartHeight - paddingTop - paddingBottom;

  const getX = (index) => {
    const step =
      (chartWidth - paddingX * 2) / visibleHours.length;

    return paddingX + index * step + step / 2;
  };

  const getBarWidth = () => {
    const step =
      (chartWidth - paddingX * 2) / visibleHours.length;

    return Math.min(step * 0.55, 22);
  };

  const getBarHeight = (probability) => {
    return (probability / 100) * chartAreaHeight;
  };

  const maxProbability = Math.max(
    ...visibleHours.map(
      (hour) => hour.precipitationProbability ?? 0
    )
  );

  return (
    <section className="rain-chart">
      <div className="rain-chart-header">
        <div>
          <h3>🌧️ Probabilidad de lluvia</h3>
          <p>Próximas 24 horas</p>
        </div>

        <span className="rain-chart-range">
          Máx. {maxProbability}%
        </span>
      </div>

      <div className="rain-chart-wrapper">
        <svg
          className="rain-chart-svg"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label={`Probabilidad de lluvia durante las próximas 24 horas. Máxima probabilidad ${maxProbability} por ciento.`}
        >
          {/* Línea base */}
          <line
            x1={paddingX}
            y1={chartHeight - paddingBottom}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingBottom}
            className="rain-chart-axis"
          />

          {/* Línea de referencia del 50% */}
          <line
            x1={paddingX}
            y1={paddingTop + chartAreaHeight / 2}
            x2={chartWidth - paddingX}
            y2={paddingTop + chartAreaHeight / 2}
            className="rain-chart-grid"
          />

          {visibleHours.map((hour, index) => {
            const probability =
              hour.precipitationProbability ?? 0;

            const x = getX(index);
            const barHeight = getBarHeight(probability);
            const y =
              chartHeight - paddingBottom - barHeight;

            return (
              <g key={hour.time}>
                <rect
                  x={x - getBarWidth() / 2}
                  y={y}
                  width={getBarWidth()}
                  height={barHeight}
                  rx="5"
                  className="rain-chart-bar"
                />

                {(index % 3 === 0 ||
                  index === visibleHours.length - 1) && (
                  <>
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      className="rain-chart-value"
                    >
                      {probability}%
                    </text>

                    <text
                      x={x}
                      y={chartHeight - 15}
                      textAnchor="middle"
                      className="rain-chart-time"
                    >
                      {hour.time.slice(11, 16)}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

export default RainChart;