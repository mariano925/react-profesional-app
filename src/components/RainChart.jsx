import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getNext24Hours } from "../utils/weatherUtils";
import "./RainChart.css";

function RainChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { time, precipitationProbability } = payload[0].payload;

  return (
    <div className="rain-chart-tooltip">
      <p className="rain-chart-tooltip-row">
        <span>Hora</span>
        <strong>{time.slice(11, 16)}</strong>
      </p>
      <p className="rain-chart-tooltip-row">
        <span>Probabilidad</span>
        <strong>
          {precipitationProbability == null
            ? "Sin datos"
            : `${precipitationProbability}%`}
        </strong>
      </p>
    </div>
  );
}

function RainChart({ hourly, timezone }) {
  if (!hourly || hourly.length === 0) return null;

  const visibleHours = getNext24Hours(hourly, timezone);

  const maxProbability = Math.max(
    ...visibleHours.map(
      (hour) => hour.precipitationProbability ?? 0
    )
  );

  const chartData = visibleHours.map((hour) => ({
    time: hour.time,
    precipitationProbability: hour.precipitationProbability,
  }));

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
        <div
          className="rain-chart-plot"
          role="img"
          aria-label={`Gráfica de barras de la probabilidad de lluvia durante las próximas 24 horas. Máxima probabilidad ${maxProbability} por ciento.`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={44}
              />
              <Tooltip
                content={<RainChartTooltip />}
                cursor={{ fill: "var(--surface-border)", opacity: 0.25 }}
              />
              <Bar
                dataKey="precipitationProbability"
                fill="var(--color-rain)"
                radius={[5, 5, 0, 0]}
                maxBarSize={20}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default RainChart;