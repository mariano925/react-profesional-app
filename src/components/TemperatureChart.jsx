import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getNext24Hours } from "../utils/weatherUtils";
import "./TemperatureChart.css";

function getTemperatureColor(temperature) {
  if (temperature <= 17) {
    return "var(--color-temp-cold)";
  }

  if (temperature <= 26) {
    return "var(--color-temp-warm)";
  }

  return "var(--color-temp-hot)";
}

function MobilePerspectiveBar(props) {
  const { x, width, scrollLeft, viewportWidth, isMobile } = props;

  if (!Number.isFinite(x) || !Number.isFinite(width)) return null;

  const visibleProgress =
    viewportWidth > 0
      ? Math.max(
          0,
          Math.min(1, (x + width / 2 - scrollLeft) / viewportWidth)
        )
      : 0;

  const scale = isMobile ? 1 - visibleProgress * 0.25 : 1;
  const scaledWidth = width * scale;

  return (
    <Rectangle
      {...props}
      x={x + (width - scaledWidth) / 2}
      width={scaledWidth}
    />
  );
}

function TemperatureBar(props) {
  const temperature = props.payload?.temperature;
  const fill = getTemperatureColor(temperature);

  return <MobilePerspectiveBar {...props} fill={fill} />;
}

function TemperatureChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { time, temperature } = payload[0].payload;

  return (
    <div className="temperature-chart-tooltip">
      <p className="temperature-chart-tooltip-row">
        <span>Hora</span>
        <strong>{time.slice(11, 16)}</strong>
      </p>

      <p className="temperature-chart-tooltip-row">
        <span>Temperatura</span>
        <strong>{Math.round(temperature)}°</strong>
      </p>
    </div>
  );
}

function TemperatureChart({ hourly, timezone }) {
  const scrollRef = useRef(null);

  const [scrollViewport, setScrollViewport] = useState({
    scrollLeft: 0,
    viewportWidth: 0,
    isMobile: false,
  });

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) return;

    const mobileQuery = window.matchMedia("(max-width: 600px)");
    let animationFrame = null;

    const updateScrollViewport = () => {
      if (animationFrame !== null) return;

      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;

        setScrollViewport({
          scrollLeft: scrollElement.scrollLeft,
          viewportWidth: scrollElement.clientWidth,
          isMobile: mobileQuery.matches,
        });
      });
    };

    scrollElement.addEventListener("scroll", updateScrollViewport, {
      passive: true,
    });

    mobileQuery.addEventListener("change", updateScrollViewport);

    const resizeObserver = new ResizeObserver(updateScrollViewport);
    resizeObserver.observe(scrollElement);

    updateScrollViewport();

    return () => {
      scrollElement.removeEventListener("scroll", updateScrollViewport);
      mobileQuery.removeEventListener("change", updateScrollViewport);
      resizeObserver.disconnect();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hourly]);

  if (!hourly || hourly.length === 0) return null;

  const visibleHours = getNext24Hours(hourly, timezone);

  const temperatures = visibleHours.map((hour) => hour.temperature);

  const minTemperature = Math.min(...temperatures);
  const maxTemperature = Math.max(...temperatures);

  const chartData = visibleHours.map((hour) => ({
    time: hour.time,
    temperature: hour.temperature,
  }));

  return (
    <section className="temperature-chart">
      <div className="temperature-chart-header">
        <div className="temperature-chart-heading">
          <h3>🌡️ Evolución de la temperatura</h3>
          <p>Próximas 24 horas</p>
        </div>

        <div className="temperature-chart-extremes">
          <span className="temperature-chart-maximum">
            Máx. {Math.round(maxTemperature)}°
          </span>

          <span className="temperature-chart-minimum">
            Mín. {Math.round(minTemperature)}°
          </span>
        </div>
      </div>

      <div className="temperature-chart-scroll" ref={scrollRef}>
        <div
          className="temperature-chart-plot"
          role="img"
          aria-label={`Evolución de la temperatura durante las próximas 24 horas. Mínima ${Math.round(
            minTemperature
          )} grados y máxima ${Math.round(maxTemperature)} grados.`}
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
                minTickGap={8}
                tickMargin={10}
              />

              <YAxis
                domain={["dataMin - 2", "dataMax + 2"]}
                tickFormatter={(temperature) => `${Math.round(temperature)}°`}
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={44}
              />

              <Tooltip
                content={<TemperatureChartTooltip />}
                cursor={{
                  fill: "var(--surface-border)",
                  opacity: 0.25,
                }}
              />

              <Bar
                dataKey="temperature"
                radius={[5, 5, 0, 0]}
                maxBarSize={28}
                isAnimationActive={false}
                shape={(props) => (
                  <TemperatureBar
                    {...props}
                    {...scrollViewport}
                  />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default TemperatureChart;