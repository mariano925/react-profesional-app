const HOURLY_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

function getCityCurrentHour(timezone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.year}-${values.month}-${values.day}T${values.hour}:00`;
}

export function getNext24Hours(hourly, timezone) {
  if (
    !Array.isArray(hourly) ||
    hourly.length === 0 ||
    typeof timezone !== "string" ||
    timezone.trim() === ""
  ) {
    return [];
  }

  let currentCityHour;

  try {
    currentCityHour = getCityCurrentHour(timezone);
  } catch {
    return [];
  }

  const validHours = hourly.filter(
    (hour) =>
      hour &&
      typeof hour.time === "string" &&
      HOURLY_TIME_PATTERN.test(hour.time)
  );

  const startIndex = validHours.findIndex(
    (hour) => hour.time >= currentCityHour
  );

  if (startIndex === -1) {
    return [];
  }

  return validHours.slice(startIndex, startIndex + 24);
}