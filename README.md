# 🌦️ Cielovivo — React Profesional App

Aplicación desarrollada con **React + Vite** como proyecto de práctica profesional.

Permite consultar el clima de distintas ciudades mediante la API de **Open-Meteo**, mostrando información meteorológica actual, pronóstico por hora, pronóstico extendido, visualización de datos y ubicación mediante un mapa interactivo.

El proyecto está organizado mediante componentes reutilizables, hooks personalizados y separación de responsabilidades.

---

## 🚀 Características actuales

* 🔎 Búsqueda del clima por ciudad.
* 🌡️ Temperatura actual y sensación térmica.
* 💨 Velocidad y dirección del viento.
* 💧 Humedad con interpretación.
* ☀️ Índice UV con interpretación.
* ◉ Presión atmosférica.
* 📈 Temperaturas máximas y mínimas.
* 🌅 Hora de salida y puesta del sol.
* ☀️🌙 Indicador de día y noche según la ubicación consultada.
* 🕐 Pronóstico de las próximas 24 horas.
* 🌙 Pronóstico horario organizado por madrugada, mañana, tarde y noche.
* 📅 Pronóstico de los próximos días.
* 📈 Gráfica de evolución de temperatura durante las próximas 24 horas.
* 🌧️ Gráfica de probabilidad de lluvia durante las próximas 24 horas.
* 🗺️ Mapa interactivo con Leaflet.
* 🌙 Modo claro y modo oscuro.
* 💾 Persistencia de preferencias mediante `localStorage`.
* ⏳ Indicador de carga.
* ⚠️ Manejo de errores.
* 📊 Vercel Analytics.
* 📱 Diseño responsive.
* ↔️ Desplazamiento horizontal del pronóstico horario en dispositivos móviles.
* 🎠 Carrusel responsive para el pronóstico de los próximos días.
* ♿ Consideraciones progresivas de accesibilidad y experiencia de usuario.

---

## 🛠️ Tecnologías utilizadas

* **React**
* **Vite**
* **JavaScript**
* **CSS**
* **Open-Meteo API**
* **Leaflet**
* **React Leaflet**
* **Embla Carousel React**
* **Vercel**
* **Vercel Analytics**

---

## 📂 Estructura principal

### `App.jsx`

Punto principal de la aplicación.

Se encarga de:

* Gestionar la ciudad seleccionada.
* Gestionar el modo claro/oscuro.
* Ejecutar la búsqueda del clima.
* Mostrar estados de carga y error.
* Renderizar `WeatherCard`.

### `WeatherCard.jsx`

Actúa como componente principal de presentación de los datos meteorológicos.

Conecta:

* `CurrentWeather`
* `HourlyForecast`
* `TemperatureChart`
* `RainChart`
* `Forecast`
* `WeatherMap`

### `CurrentWeather.jsx`

Muestra la información meteorológica actual:

* Ciudad.
* Temperatura.
* Sensación térmica.
* Descripción.
* Máxima y mínima.
* Viento y dirección.
* Humedad e interpretación.
* Índice UV e interpretación.
* Presión atmosférica.
* Hora de salida del sol.
* Hora de puesta del sol.
* Indicador de día o noche.

### `HourlyForecast.jsx`

Muestra el pronóstico meteorológico de las próximas 24 horas.

La información está organizada visualmente por:

* 🌙 Madrugada.
* ☀️ Mañana.
* 🌤️ Tarde.
* 🌙 Noche.

Cada período dispone de desplazamiento horizontal para consultar las diferentes horas.

### `TemperatureChart.jsx`

Muestra la evolución de la temperatura durante las próximas 24 horas mediante una gráfica de líneas.

Incluye:

* Temperatura prevista por hora.
* Valores destacados.
* Horarios correspondientes.
* Temperatura mínima y máxima del período.

### `RainChart.jsx`

Muestra la probabilidad de lluvia durante las próximas 24 horas mediante una gráfica de barras.

Incluye:

* Probabilidad de precipitación por hora.
* Horarios correspondientes.
* Porcentaje máximo previsto.
* Visualización responsive.

### `Forecast.jsx`

Muestra el pronóstico extendido de los próximos días.

Incluye:

* Fecha.
* Ícono meteorológico.
* Temperatura mínima.
* Temperatura máxima.
* Rango térmico visual.
* Índice UV.

La información se presenta mediante un carrusel responsive.

### `WeatherMap.jsx`

Muestra la ubicación de la ciudad mediante un mapa interactivo utilizando **Leaflet**.

### `SearchBar.jsx`

Permite introducir una ciudad y ejecutar una nueva búsqueda.

### `Loader.jsx`

Indica visualmente que la aplicación está obteniendo información.

### `ErrorMessage.jsx`

Muestra mensajes cuando no es posible obtener los datos meteorológicos.

---

## 🔑 Servicios

### `weatherService.js`

Centraliza la comunicación con la API de **Open-Meteo**.

Se encarga de obtener y transformar los datos meteorológicos antes de entregarlos a la aplicación.

Flujo principal:

```text
Open-Meteo
     ↓
weatherService.js
     ↓
useWeather.js
     ↓
App.jsx
     ↓
WeatherCard.jsx
     ↓
Componentes meteorológicos
```

---

## 🪝 Hooks

### `useWeather.js`

Encapsula la lógica relacionada con la obtención del clima.

Gestiona:

* `weather`
* `loading`
* `error`

### `useLocalStorage.js`

Permite guardar información en `localStorage` y recuperarla cuando se vuelve a cargar la aplicación.

Actualmente se utiliza para conservar:

* Última ciudad seleccionada.
* Preferencia de modo claro/oscuro.

### `useForm.js`

Hook utilizado para trabajar con formularios controlados y gestionar sus cambios y reseteo.

---

## 🎨 Diseño

La interfaz utiliza un estilo **Glassmorphism**, con:

* Superficies translúcidas.
* Desenfoque de fondo.
* Bordes sutiles.
* Sombras ambientales.
* Diseño responsive.
* Adaptación para modo claro y oscuro.

El objetivo es mantener una interfaz moderna sin depender de una biblioteca de componentes visuales.

---

## 📱 Responsive

La aplicación está adaptada para diferentes tamaños de pantalla.

En dispositivos móviles se realizan ajustes específicos para:

* Espaciado.
* Tarjetas.
* Pronóstico por hora.
* Desplazamiento horizontal de las franjas horarias.
* Pronóstico de los próximos días.
* Carrusel del pronóstico.
* Gráficas meteorológicas.
* Visualización del mapa.

---

## ♿ UX y accesibilidad

El proyecto incorpora progresivamente principios de **User Experience (UX)** y accesibilidad.

Se busca que la información meteorológica sea:

* Fácil de encontrar.
* Fácil de comprender.
* Clara en diferentes tamaños de pantalla.
* Utilizable mediante diferentes formas de interacción.
* Visualmente consistente.
* Accesible para diferentes tipos de usuarios.

También se tienen en cuenta aspectos como:

* Contraste de colores.
* Estados de foco visibles.
* Diseño responsive.
* Reducción de movimiento cuando el usuario lo solicita mediante `prefers-reduced-motion`.
* Reducción de carga cognitiva.
* Jerarquía visual de la información.
* Presentación progresiva de información secundaria.

La prioridad de la interfaz es presentar primero la información meteorológica más relevante y dejar la información secundaria en niveles posteriores.

---

## 📊 Arquitectura

El proyecto busca practicar una arquitectura modular basada en la separación de responsabilidades:

```text
Componentes
     ↓
Hooks
     ↓
Servicio de datos
     ↓
API externa
```

Esta estructura facilita el mantenimiento y permite continuar ampliando la aplicación.

---

## 🎯 Objetivos de aprendizaje

Este proyecto fue desarrollado para practicar:

* Arquitectura modular en React.
* Componentes reutilizables.
* Props y estado.
* Hooks personalizados.
* `useEffect`.
* Persistencia con `localStorage`.
* Consumo de APIs externas.
* Manejo de estados de carga y error.
* Integración de mapas.
* Visualización de datos mediante SVG.
* Diseño responsive.
* Organización de estilos CSS.
* Integración de carruseles.
* Control de versiones con Git y GitHub.
* Deploy mediante Vercel.
* Principios de UX y accesibilidad.

---

## 📌 Funcionalidades pendientes

Las siguientes funcionalidades forman parte de las próximas etapas de desarrollo:

1. 📝 **Resumen automático del clima**

   * Generar una descripción sencilla de las condiciones actuales y próximas.
   * Utilizar los datos meteorológicos existentes para facilitar su interpretación.

2. 🔄 **Actualizar clima manualmente**

   * Permitir volver a consultar los datos sin cambiar de ciudad.

3. 📍 **Usar mi ubicación**

   * Permitir consultar automáticamente el clima de la ubicación del usuario mediante geolocalización del navegador.

4. ⭐ **Ciudades favoritas**

   * Guardar ciudades frecuentes para acceder rápidamente a ellas.

5. 📤 **Compartir el pronóstico**

   * Permitir compartir información meteorológica mediante las opciones disponibles en el dispositivo o navegador.

6. 🌧️ **Resumen de lluvia**

   * Identificar durante qué período del día existe mayor probabilidad de lluvia.
   * Complementar la información de la gráfica de precipitación.

7. 💨 **Resumen del viento**

   * Mostrar una interpretación sencilla de la velocidad y dirección del viento.

8. 🌅 **Información solar ampliada**

   * Presentar de forma más visual la información de amanecer, atardecer y duración del día.

9. ⚠️ **Indicadores meteorológicos destacados**

   * Destacar visualmente determinadas condiciones meteorológicas relevantes a partir de los datos disponibles.

10. 🕘 **Última actualización**

    * Mostrar cuándo se consultaron los datos meteorológicos.

11. 🔎 **Historial de búsquedas**

    * Conservar las últimas ciudades consultadas para acceder rápidamente a ellas.

12. 📊 **Comparación de ciudades**

    * Comparar información meteorológica de dos o más ciudades.

---

## 🌐 API

Los datos meteorológicos son proporcionados por **Open-Meteo**.

La aplicación utiliza sus servicios para obtener información de:

* Clima actual.
* Pronóstico horario.
* Pronóstico diario.
* Temperatura.
* Sensación térmica.
* Humedad.
* Viento.
* Presión atmosférica.
* Índice UV.
* Salida y puesta del sol.
* Probabilidad de precipitación.
* Códigos meteorológicos.

---

## ✍️ Autor

Creado por **Mariano Moreyra** como proyecto de aprendizaje y práctica profesional.

---

## 📌 Estado del proyecto

Proyecto de aprendizaje en evolución.

Actualmente se encuentra en una etapa de mejora progresiva de la **experiencia de usuario, accesibilidad, visualización de datos y funcionalidades meteorológicas**, incorporando nuevas características sin backend y manteniendo una arquitectura frontend modular.
