// src/services/weatherService.js

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
