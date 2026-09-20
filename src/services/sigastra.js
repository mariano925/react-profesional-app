const SIGASTRA_BASE_URL = "https://sigastra.com/api/v1";

export async function getDailyHoroscope(sign) {
  const url = new URL(`${SIGASTRA_BASE_URL}/daily`);

  // Indicamos el idioma y el signo que queremos consultar.
  url.searchParams.set("lang", "es");
  url.searchParams.set("sign", sign);
  url.searchParams.set("full", "1");

  // Consultamos una API externa.
  const response = await fetch(url);

  // Verificamos si la API respondió correctamente.
  if (!response.ok) {
    throw new Error(`Error HTTP de Sigastra: ${response.status}`);
  }

  // Convertimos el JSON recibido en un objeto JavaScript.
  const data = await response.json();

  // Verificamos que la API haya devuelto el contenido esperado.
  if (!data?.items?.[0]?.text) {
    throw new Error("Respuesta de Sigastra sin texto de horóscopo");
  }

  return data;
}

// Exploramos el endpoint semanal de la API.
export async function getWeeklyHoroscope(sign) {
  const url = new URL(`${SIGASTRA_BASE_URL}/weekly`);

  // Indicamos el idioma y el signo que queremos consultar.
  url.searchParams.set("lang", "es");
  url.searchParams.set("sign", sign);
  url.searchParams.set("full", "1");

  // Consultamos la API semanal.
  const response = await fetch(url);

  // Verificamos si la API respondió correctamente.
  if (!response.ok) {
    throw new Error(`Error HTTP de Sigastra: ${response.status}`);
  }

  // Convertimos el JSON recibido en un objeto JavaScript.
  const data = await response.json();

  // Exploramos qué información real devuelve este endpoint.
  console.log(
    "Respuesta completa de Sigastra - weekly:",
    JSON.stringify(data, null, 2)
  );

  return data;
}

// Exploramos el endpoint mensual de la API.
export async function getMonthlyHoroscope(sign) {
  const url = new URL(`${SIGASTRA_BASE_URL}/monthly`);

  // Indicamos el idioma, el signo y que queremos el contenido completo.
  url.searchParams.set("lang", "es");
  url.searchParams.set("sign", sign);
  url.searchParams.set("full", "1");

  // Consultamos la API mensual.
  const response = await fetch(url);

  // Verificamos si la API respondió correctamente.
  if (!response.ok) {
    throw new Error(`Error HTTP de Sigastra: ${response.status}`);
  }

  // Convertimos el JSON recibido en un objeto JavaScript.
  const data = await response.json();

  // Exploramos qué información real devuelve este endpoint.
  console.log(
    "Respuesta completa de Sigastra - monthly:",
    JSON.stringify(data, null, 2)
  );

  return data;
}