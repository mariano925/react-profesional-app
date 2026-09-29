// Servicio para consultar niveles de ríos del INA

const INA_API = "https://alerta.ina.gob.ar/pub/datos/datos";

const PUERTO_RUIZ_SITE_CODE = 46;
const ALTURA_HIDROMETRICA_VAR_ID = 2;

// Formatea una fecha como YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Obtiene las mediciones de Puerto Ruiz
export async function getPuertoRuizLevel() {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 8);

  const timeStart = formatDate(startDate);
  const timeEnd = formatDate(today);

  const url =
    `${INA_API}` +
    `&timeStart=${timeStart}` +
    `&timeEnd=${timeEnd}` +
    `&siteCode=${PUERTO_RUIZ_SITE_CODE}` +
    `&varId=${ALTURA_HIDROMETRICA_VAR_ID}` +
    `&format=json`;

  console.log("URL INA:", url);

  const response = await fetch(url);

  console.log("Status INA:", response.status);
  console.log("Respuesta OK:", response.ok);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los datos del río");
  }

  const data = await response.json();

  const observations = data.data;

  if (!observations || observations.length === 0) {
    throw new Error("No hay datos disponibles para Puerto Ruiz");
  }

  const latestObservation = observations[observations.length - 1];

  return {
    station: "Puerto Ruiz",
    river: "Río Gualeguay",
    level: latestObservation.valor,
    unit: "m",
    date: latestObservation.timestart,
    updatedAt: latestObservation.timeupdate,
    observations,
  };
}