import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getNext24Hours } from "../utils/weatherUtils";
import "./HumidityChart.css";

function MobilePerspectiveBar(props) {
  const { x, width, scrollLeft, viewportWidth, isMobile } = props;

  if (!Number.isFinite(x) || !Number.isFinite(width)) return null;

  const visibleProgress = viewportWidth > 0
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

function getHumidityColor(humidity) {
  if (humidity < 40) return "var(--color-humidity-low)";
  if (humidity < 70) return "var(--color-humidity-medium)";

  return "var(--color-humidity-high)";
}

function HumidityChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { time, humidity } = payload[0].payload;

  return (
    <div className="humidity-chart-tooltip">
      <p className="humidity-chart-tooltip-row">
        <span>Hora</span>
        <strong>{time.slice(11, 16)}</strong>
      </p>
      <p className="humidity-chart-tooltip-row">
        <span>Humedad</span>
        <strong>{humidity}%</strong>
      </p>
    </div>
  );
}

function HumidityChart({ hourly, timezone }) {
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

  const displayedHours = visibleHours.filter(
    (_, index) =>
      index % 3 === 0 ||
      index === visibleHours.length - 1
  );

  const chartData = displayedHours
    .filter((hour) => hour.humidity != null)
    .map((hour) => ({
      time: hour.time,
      humidity: hour.humidity,
    }));

  return (
    <section className="humidity-chart">
      <div className="humidity-chart-header">
        <div>
          <h3>💧 Humedad relativa</h3>
          <p>Próximas 24 horas</p>
        </div>
      </div>

      <div className="humidity-chart-wrapper" ref={scrollRef}>
        <div
          className="humidity-chart-plot"
            role="img"
            aria-label="Gráfica de barras de la humedad relativa durante las próximas 24 horas. El eje vertical representa porcentajes de humedad."
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
                  content={<HumidityChartTooltip />}
                  cursor={{ fill: "var(--surface-border)", opacity: 0.25 }}
                />
                <Bar
                  dataKey="humidity"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={28}
                  isAnimationActive={false}
                  shape={
                    scrollViewport.isMobile
                      ? (props) => (
                          <MobilePerspectiveBar
                            {...props}
                            {...scrollViewport}
                          />
                        )
                      : undefined
                  }
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.time}
                      fill={getHumidityColor(entry.humidity)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default HumidityChart;