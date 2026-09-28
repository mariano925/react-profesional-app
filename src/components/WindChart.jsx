import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getNext24Hours } from "../utils/weatherUtils";
import "./WindChart.css";

function WindChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { time, direction, windDirection } = payload[0].payload;

  return (
    <div className="wind-chart-tooltip">
      <p className="wind-chart-tooltip-row">
        <span>Hora</span>
        <strong>{time.slice(11, 16)}</strong>
      </p>
      <p className="wind-chart-tooltip-row">
        <span>Dirección</span>
        <strong>{direction}</strong>
      </p>
      <p className="wind-chart-tooltip-row">
        <span>Grados</span>
        <strong>{windDirection}°</strong>
      </p>
    </div>
  );
}

function WindChart({ hourly, timezone }) {
  if (!hourly || hourly.length === 0) return null;

  const visibleHours = getNext24Hours(hourly, timezone);

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

  const chartData = displayedHours
    .filter((hour) => hour.windDirection != null)
    .map((hour) => ({
      time: hour.time,
      windDirection: hour.windDirection,
      direction: getWindDirection(hour.windDirection),
    }));

  return (
    <section className="wind-chart">
      <div className="wind-chart-header">
        <div>
          <h3>🧭 Dirección del viento</h3>
          <p>Próximas 24 horas</p>
        </div>
      </div>

      <div className="wind-chart-wrapper">
        <div
          className="wind-chart-plot"
          role="img"
          aria-label="Gráfica de líneas de la dirección del viento cada tres horas durante las próximas 24 horas. El eje vertical muestra grados; el tooltip indica hora, dirección cardinal y grados."
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 16, right: 12, bottom: 4, left: 4 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="var(--surface-border)"
                strokeDasharray="3 5"
              />
              <XAxis
                dataKey="time"
                tickFormatter={(time) => time.slice(11, 16)}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: "var(--surface-border)" }}
                minTickGap={12}
                tickMargin={10}
              />
              <YAxis
                type="number"
                domain={[0, 360]}
                ticks={[0, 90, 180, 270, 360]}
                tickFormatter={(degrees) => `${degrees}°`}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={44}
              />
              <Tooltip
                content={<WindChartTooltip />}
                cursor={{ stroke: "var(--surface-border)" }}
              />
              <Line
                type="linear"
                dataKey="windDirection"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "var(--surface-card)",
                  stroke: "var(--color-primary)",
                  strokeWidth: 2.5,
                }}
                activeDot={{
                  r: 6,
                  fill: "var(--color-primary)",
                  stroke: "var(--surface-card)",
                  strokeWidth: 2,
                }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default WindChart;