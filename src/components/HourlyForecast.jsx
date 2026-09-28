import React, { useEffect, useRef, useState } from "react";
import { getNext24Hours } from "../utils/weatherUtils";
import "./HourlyForecast.css";

// Convierte el código meteorológico y el momento del día
// en un ícono.
function getWeatherIcon(code, isDay) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code === 1 || code === 2) return isDay ? "🌤️" : "🌙";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95 && code <= 99) return "⛈️";

  return isDay ? "🌤️" : "🌙";
}

function formatDayLabel(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

// Determina a qué momento del día pertenece cada hora.
function getTimePeriod(hour) {
  if (hour >= 1 && hour <= 5) {
    return {
      id: "madrugada",
      label: "Madrugada",
      icon: "🌙",
    };
  }

  if (hour >= 6 && hour <= 11) {
    return {
      id: "manana",
      label: "Mañana",
      icon: "☀️",
    };
  }

  if (hour >= 12 && hour <= 17) {
    return {
      id: "tarde",
      label: "Tarde",
      icon: "🌤️",
    };
  }

  return {
    id: "noche",
    label: "Noche",
    icon: "🌙",
  };
}

function HourlyForecast({ hourly, timezone }) {
  // Guarda las horas centradas de cada carrusel.
  const [centeredHours, setCenteredHours] = useState(
    new Set()
  );

  const sectionRef = useRef(null);

  const visibleHours = getNext24Hours(hourly, timezone);

  // Detecta la tarjeta más cercana al centro
  // de cada carrusel por separado.
  useEffect(() => {
    if (!visibleHours.length) return;

    const section = sectionRef.current;

    if (!section) return;

    const updateCenteredCards = () => {
      // En escritorio no existe efecto de centrado.
      if (window.innerWidth >= 768) {
        setCenteredHours(new Set());
        return;
      }

      const tracks = section.querySelectorAll(
        ".hourly-track"
      );

      const nextCenteredHours = new Set();

      tracks.forEach((track) => {
        const trackRect = track.getBoundingClientRect();

        const trackCenter =
          trackRect.left + trackRect.width / 2;

        const cards =
          track.querySelectorAll(".hourly-card");

        let closestHour = null;
        let closestDistance = Infinity;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();

          const cardCenter =
            cardRect.left + cardRect.width / 2;

          const distance = Math.abs(
            trackCenter - cardCenter
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestHour = card.dataset.hour;
          }
        });

        // Cada carrusel guarda su propia tarjeta centrada.
        if (closestHour) {
          nextCenteredHours.add(closestHour);
        }
      });

      setCenteredHours(nextCenteredHours);
    };

    let animationFrame = null;

    const handleScroll = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(
        updateCenteredCards
      );
    };

    const tracks = section.querySelectorAll(
      ".hourly-track"
    );

    tracks.forEach((track) => {
      track.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    });

    // Detecta la tarjeta inicial.
    updateCenteredCards();

    window.addEventListener(
      "resize",
      updateCenteredCards
    );

    return () => {
      tracks.forEach((track) => {
        track.removeEventListener(
          "scroll",
          handleScroll
        );
      });

      window.removeEventListener(
        "resize",
        updateCenteredCards
      );

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [visibleHours.length]);

  if (!hourly || hourly.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="hourly-section"
    >
      <div className="hourly-header">
        <h3>Pronóstico por hora</h3>

        <span className="hourly-scroll-hint">
          Deslizá para ver más →
        </span>
      </div>

      {visibleHours.map((hour, index) => {
        const currentDate = hour.time.slice(0, 10);

        const previousDate =
          index > 0
            ? visibleHours[index - 1].time.slice(0, 10)
            : null;

        const dayChanged =
          index === 0 ||
          currentDate !== previousDate;

        if (!dayChanged) return null;

        const hoursForDay = visibleHours.filter(
          (dayHour) => dayHour.time.slice(0, 10) === currentDate
        );

        const periodGroups = [];

        hoursForDay.forEach((dayHour) => {
          const period = getTimePeriod(
            Number(dayHour.time.slice(11, 13))
          );
          const lastGroup = periodGroups[periodGroups.length - 1];

          if (lastGroup?.id === period.id) {
            lastGroup.hours.push(dayHour);
          } else {
            periodGroups.push({
              ...period,
              hours: [dayHour],
            });
          }
        });

        return (
          <div
            key={currentDate}
            className="hourly-day"
          >
            <h4>
              {formatDayLabel(currentDate)}
            </h4>

            {periodGroups.map((group, groupIndex) => (
                  <div
                    key={`${currentDate}-${group.id}-${groupIndex}`}
                    className="hourly-period"
                  >
                    <div className="hourly-period-header">
                      <h5>
                        {group.icon} {group.label}
                      </h5>
                    </div>

                    <div className="hourly-track">
                      {group.hours.map((hour) => {
                        const isCentered =
                          centeredHours.has(hour.time);

                        return (
                          <div
                            key={hour.time}
                            className="hourly-item"
                          >
                            <div
                              className={`hourly-card ${
                                isCentered
                                  ? "is-centered"
                                  : ""
                              }`}
                              data-hour={hour.time}
                            >
                              <strong>
                                {hour.time.slice(
                                  11,
                                  16
                                )}
                              </strong>

                              <span className="hourly-temperature">
                                {Math.round(
                                  hour.temperature
                                )}
                                °
                              </span>

                              <span className="hourly-icon">
                                {getWeatherIcon(
                                  hour.weatherCode,
                                  hour.isDay
                                )}
                              </span>

                              <span className="hourly-description">
                                {hour.description}
                              </span>

                              <span className="hourly-rain">
                                💧
                                {
                                  hour.precipitationProbability
                                }
                                %
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
          </div>
        );
      })}
    </section>
  );
}

export default HourlyForecast;