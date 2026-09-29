import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPuertoRuizLevel } from "../services/riverService";
import "./RiverLevels.css";

const riverReferences = [
  {
    value: 0.8,
    label: "Aguas bajas",
    displayValue: "0,80 m",
    color: "var(--color-temp-cold)",
  },
  {
    value: 4.5,
    label: "Alerta",
    displayValue: "4,50 m",
    color: "var(--color-sun)",
  },
  {
    value: 5,
    label: "Evacuación",
    displayValue: "5,00 m",
    color: "var(--color-temp-hot)",
  },
];

function RiverLevels() {
  const [riverData, setRiverData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPuertoRuizLevel()
      .then((data) => {
        setRiverData(data);
      })
      .catch((error) => {
        console.error("Error al obtener Puerto Ruiz:", error);
        setError("No se pudo obtener el nivel del río.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!riverData) {
    return <p>Cargando nivel del río...</p>;
  }

  const formattedDate = new Date(riverData.date).toLocaleDateString(
    "es-AR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedLevel = Number(riverData.level)
    .toFixed(2)
    .replace(".", ",");

  const chartData = riverData.observations.map((observation) => ({
    timestamp: new Date(observation.timestart).getTime(),
    level: Number(observation.valor),
  }));

  return (
    <section className="river-level">
      <header className="river-level-header">
        <h2>Nivel del río</h2>

        <p className="river-level-location">
          <span>{riverData.station}</span>
          <span aria-hidden="true">·</span>
          <span>{riverData.river}</span>
        </p>
      </header>

      <div className="river-current">
        <strong className="river-level-value">
          <span>{formattedLevel}</span>
          <span className="river-level-unit">{riverData.unit}</span>
        </strong>

        <p className="river-updated">Última medición: {formattedDate}</p>
      </div>

      <div className="river-chart-section">
        <h3 className="river-chart-title">Evolución reciente</h3>

        <ul className="river-reference-legend" aria-label="Niveles de referencia">
          {riverReferences.map((reference) => (
            <li
              className="river-reference-item"
              key={reference.label}
              style={{ "--reference-color": reference.color }}
            >
              <span className="river-reference-swatch" aria-hidden="true" />
              <span>
                {reference.label} · {reference.displayValue}
              </span>
            </li>
          ))}
        </ul>

        <div className="river-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke="var(--surface-border)"
                strokeDasharray="3 4"
                vertical={false}
              />

              <XAxis
                dataKey="timestamp"
                type="number"
                scale="time"
                domain={["dataMin", "dataMax"]}
                tickCount={6}
                minTickGap={24}
                interval="preserveStartEnd"
                tickMargin={8}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={{ stroke: "var(--surface-border)" }}
                tickLine={{ stroke: "var(--surface-border)" }}
                tickFormatter={(timestamp) =>
                  new Date(timestamp).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                  })
                }
              />

              <YAxis
                domain={[
                  (dataMin) => Math.min(dataMin, 0.8),
                  (dataMax) => Math.max(dataMax, 5),
                ]}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={{ stroke: "var(--surface-border)" }}
                tickLine={{ stroke: "var(--surface-border)" }}
                tickFormatter={(value) => `${value} m`}
              />

              {riverReferences.map((reference) => (
                <ReferenceLine
                  key={reference.label}
                  y={reference.value}
                  stroke={reference.color}
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                />
              ))}

              <Tooltip
                labelFormatter={(timestamp) =>
                  new Date(Number(timestamp)).toLocaleString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
                formatter={(value) => [`${value} m`, "Nivel"]}
                contentStyle={{
                  backgroundColor: "var(--river-tooltip-bg)",
                  border: "1px solid var(--river-tooltip-border)",
                  borderRadius: "10px",
                  color: "var(--river-tooltip-text)",
                }}
                labelStyle={{
                  color: "var(--river-tooltip-text)",
                }}
                itemStyle={{
                  color: "var(--river-tooltip-text)",
                }}
              />

              <Line
                type="monotone"
                dataKey="level"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default RiverLevels;