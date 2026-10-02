import "./AirQuality.css";

function getAirQualityCategory(aqi) {
  if (aqi <= 20) return "Buena";
  if (aqi <= 40) return "Aceptable";
  if (aqi <= 60) return "Moderada";
  if (aqi <= 80) return "Mala";
  if (aqi <= 100) return "Muy mala";

  return "Extremadamente mala";
}

function getIndicatorPosition(aqi) {
  const clampedAqi = Math.max(0, Math.min(aqi, 100));

  return clampedAqi;
}

function AirQuality({ aqi }) {
  if (aqi === null || aqi === undefined) {
    return null;
  }

  const category = getAirQualityCategory(aqi);
  const indicatorPosition = getIndicatorPosition(aqi);

  return (
    <section className="air-quality">
      <h2>🌫️ Calidad del aire</h2>

      <div className="air-quality-value">
        <span className="air-quality-category">{category}</span>
        <span className="air-quality-index">AQI {aqi}</span>
      </div>

      <div className="air-quality-scale">
        <div className="air-quality-bar">
          <span className="air-quality-segment air-quality-segment-good" />
          <span className="air-quality-segment air-quality-segment-acceptable" />
          <span className="air-quality-segment air-quality-segment-moderate" />
          <span className="air-quality-segment air-quality-segment-bad" />
          <span className="air-quality-segment air-quality-segment-very-bad" />
        </div>

        <span
          className="air-quality-indicator"
          style={{ left: `${indicatorPosition}%` }}
          aria-label={`AQI ${aqi}`}
        >
          ▲
        </span>
      </div>

      <p className="air-quality-source">
        Estimación basada en datos de Open-Meteo
      </p>
    </section>
  );
}

export default AirQuality;