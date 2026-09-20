// Servicio que busca coordenadas y luego obtiene el clima

export async function getWeather(city) {
  // 1. Buscar coordenadas de la ciudad
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1`
  );

  if (!geoRes.ok) {
    throw new Error("No se pudo buscar la ciudad");
  }

  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // 2. Obtener datos meteorológicos
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,surface_pressure&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset,weather_code&timezone=auto&forecast_days=7`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el clima");
  }

  const data = await response.json();

  // 3. Transformar los datos para nuestra aplicación
  return {
    latitude,
    longitude,
    city: `${name}, ${country}`,

    // Zona horaria de la ciudad consultada
    timezone: data.timezone,
    utcOffsetSeconds: data.utc_offset_seconds,

    // Clima actual
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    description: mapWeatherCode(data.current.weather_code),
    weatherCode: data.current.weather_code,

    // Viento
    wind: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,

    // Humedad y presión
    humidity: data.current.relative_humidity_2m,
    pressure: data.current.surface_pressure,

    // Datos solares
    uvIndex: data.daily.uv_index_max[0],
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],

    // Pronóstico de 7 días
    max: data.daily.temperature_2m_max[0],
    min: data.daily.temperature_2m_min[0],

    forecast: data.daily.time.map((day, i) => ({
      date: day,
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      uvIndex: data.daily.uv_index_max[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
      weatherCode: data.daily.weather_code[i],
    })),

    // Pronóstico por hora
    hourly: data.hourly.time.map((time, i) => ({
      time,
      temperature: data.hourly.temperature_2m[i],
      precipitationProbability:
        data.hourly.precipitation_probability[i],
      humidity: data.hourly.relative_humidity_2m[i],
      weatherCode: data.hourly.weather_code[i],
      isDay: data.hourly.is_day[i],
      description: mapWeatherCode(data.hourly.weather_code[i]),
    })),
  };
}

// Convierte los códigos meteorológicos de Open-Meteo
// en descripciones comprensibles
function mapWeatherCode(code) {
  const codes = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",

    45: "Niebla",
    48: "Niebla con escarcha",

    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna intensa",

    56: "Llovizna helada ligera",
    57: "Llovizna helada intensa",

    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",

    66: "Lluvia helada ligera",
    67: "Lluvia helada intensa",

    71: "Nieve ligera",
    73: "Nieve moderada",
    75: "Nieve intensa",

    77: "Granizo",

    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos violentos",

    85: "Chubascos de nieve ligeros",
    86: "Chubascos de nieve intensos",

    95: "Tormenta eléctrica",
    96: "Tormenta eléctrica con granizo ligero",
    99: "Tormenta eléctrica con granizo intenso",
  };

  return codes[code] || `Código desconocido (${code})`;
}