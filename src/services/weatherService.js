// src/services/weatherService.js
//Aqui va la API Key de OpenWeatherMap
const API_KEY = "YOUR_API_KEY_HERE"; //
// Función simulada: devuelve datos ficticios
export async function getWeather(city) {
  // Podés simular un pequeño delay para que parezca real
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: 25,
        description: "Cielo despejado",
      });
    }, 500);
  });
}
