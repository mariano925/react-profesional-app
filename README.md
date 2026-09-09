# 🌦️ React Profesional App

Aplicación desarrollada con **React + Vite** como proyecto de práctica profesional.

Permite consultar el clima de distintas ciudades mediante la API de **Open-Meteo**, mostrando información meteorológica actual, pronóstico por hora, pronóstico de 7 días y ubicación mediante un mapa interactivo.

El proyecto está organizado mediante componentes reutilizables, hooks personalizados y separación de responsabilidades.

---

## 🚀 Características

* 🔎 Búsqueda del clima por ciudad.
* 🌡️ Temperatura actual y sensación térmica.
* 💨 Velocidad y dirección del viento.
* 💧 Humedad.
* ☀️ Índice UV.
* ◉ Presión atmosférica.
* 📈 Temperaturas máximas y mínimas.
* 🕐 Pronóstico por hora.
* 📅 Pronóstico extendido de 7 días.
* 🗺️ Mapa interactivo con Leaflet.
* 🌙 Modo claro y modo oscuro.
* 💾 Persistencia de preferencias mediante `localStorage`.
* ⏳ Indicador de carga.
* ⚠️ Manejo de errores.
* 📊 Vercel Analytics.

---

## 🛠️ Tecnologías utilizadas

* **React**
* **Vite**
* **JavaScript**
* **CSS**
* **Open-Meteo API**
* **Leaflet**
* **React Leaflet**
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
* Humedad.
* Índice UV.
* Presión atmosférica.

### `HourlyForecast.jsx`

Muestra el pronóstico meteorológico de las próximas horas mediante un carrusel horizontal.

### `Forecast.jsx`

Muestra el pronóstico extendido de 7 días, incluyendo temperaturas máximas, mínimas y rango térmico.

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
* Pronóstico semanal.
* Visualización del mapa.

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
* Diseño responsive.
* Organización de estilos CSS.
* Control de versiones con Git y GitHub.
* Deploy mediante Vercel.

---

## 🌐 API

Los datos meteorológicos son proporcionados por **Open-Meteo**.

La aplicación utiliza sus servicios para obtener información de:

* Clima actual.
* Pronóstico horario.
* Pronóstico diario.
* Variables meteorológicas adicionales.

---

## ✍️ Autor

Creado por **Mariano Moreyra** como proyecto de aprendizaje y práctica profesional.

---

## 📌 Estado del proyecto

Proyecto de aprendizaje en evolución, utilizado para incorporar progresivamente nuevas funcionalidades y mejorar la arquitectura, diseño y experiencia de usuario.
