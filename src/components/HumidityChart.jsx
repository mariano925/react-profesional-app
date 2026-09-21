import React from "react";
import "./HumidityChart.css";

function HumidityChart({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  const visibleHours = hourly.slice(0, 24);

  const displayedHours = visibleHours.filter(
    (_, index) =>
      index % 3 === 0 ||
      index === visibleHours.length - 1
  );

  return (
    <section className="humidity-chart">
      <div className="humidity-chart-header">
        <div>
          <h3>💧 Humedad relativa</h3>
          <p>Próximas 24 horas</p>
        </div>
      </div>

      <div className="humidity-chart-grid">
        {displayedHours.map((hour) => {
          if (hour.humidity == null) {
            return null;
          }

          const humidity = Math.round(hour.humidity);

          return (
            <div
              className="humidity-point"
              key={hour.time}
            >
              <div className="humidity-time">
                {hour.time.slice(11, 16)}
              </div>

              <div className="humidity-bar-container">
                <div
                  className="humidity-bar"
                  style={{
                    height: `${humidity}%`,
                  }}
                  aria-label={`A las ${hour.time.slice(
                    11,
                    16
                  )}, la humedad relativa es del ${humidity} por ciento.`}
                >
                  <span>{humidity}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HumidityChart;