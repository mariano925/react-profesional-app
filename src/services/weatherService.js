// Servicio que busca coordenadas y luego el clima
export async function getWeather(city) {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el clima");
  }

  const data = await response.json();

  return {
    city: `${name}, ${country}`,
    temperature: data.current_weather.temperature,
    description: mapWeatherCode(data.current_weather.weathercode),
    wind: data.current_weather.windspeed,
    humidity: data.hourly.relative_humidity_2m?.[0], // 👈 ahora sí humedad
    max: data.daily.temperature_2m_max[0],
    min: data.daily.temperature_2m_min[0],
  };
}

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

