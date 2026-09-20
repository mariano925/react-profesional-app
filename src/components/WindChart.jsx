import React from "react";
import "./WindChart.css";

function WindChart({ hourly }) {
  if (!hourly || hourly.length === 0) return null;

  const visibleHours = hourly.slice(0, 24);

  const getWindDirection = (degrees) => {
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

    const normalizedDegrees = ((degrees % 360) + 360) % 360;
    const index = Math.round(normalizedDegrees / 45) % 8;

    return directions[index];
  };

  // Mostramos una brújula cada 3 horas.
  const displayedHours = visibleHours.filter(
    (_, index) =>
      index % 3 === 0 ||
      index === visibleHours.length - 1
  );

  return (
    <section className="wind-chart">
      <div className="wind-chart-header">
        <div>
          <h3>🧭 Dirección del viento</h3>
          <p>Próximas 24 horas</p>
        </div>
      </div>

      <div className="wind-chart-grid">
        {displayedHours.map((hour) => {
          if (hour.windDirection == null) {
            return null;
          }

          const direction = getWindDirection(
            hour.windDirection
          );
                // Open-Meteo indica de dónde viene el viento.
              // Ajustamos 90° porque la flecha CSS parte apuntando hacia el Este.
            const arrowRotation =
              (hour.windDirection + 90) % 360;
          return (
            <div
              className="wind-compass"
              key={hour.time}
            >
              <div className="wind-compass-time">
                {hour.time.slice(11, 16)}
              </div>

              <div
                className="wind-compass-dial"
                aria-label={`A las ${hour.time.slice(
                  11,
                  16
                )}, el viento viene del ${direction}, ${Math.round(
                  hour.windDirection
                )} grados.`}
              >
                <div
                  className="wind-compass-arrow"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
                  }}
                  aria-hidden="true"
                >
                  <span className="wind-compass-arrow-line" />
                  <span className="wind-compass-arrow-head" />
                </div>

                <div
                  className="wind-compass-center"
                  aria-hidden="true"
                />
              </div>

              <div className="wind-compass-direction">
                {direction}
              </div>

              <div className="wind-compass-degrees">
                {Math.round(hour.windDirection)}°
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WindChart;