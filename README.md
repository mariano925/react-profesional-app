# 🌦️ Cielovivo

Aplicación meteorológica desarrollada con **React y Vite** para consultar el clima y los pronósticos de distintas ciudades. Combina visualización de datos, mapas interactivos y una interfaz responsive con modo claro y oscuro.

## ✨ Funcionalidades actuales

- 🔎 Búsqueda del clima por ciudad.
- 🌡️ Condiciones actuales: temperatura, sensación térmica, viento, humedad, presión e índice UV.
- 🕐 Pronóstico por hora y para los próximos días.
- 📈 Gráficas de temperatura y probabilidad de lluvia.
- 🗺️ Mapa interactivo con Leaflet.
- 🌙 Modo claro y oscuro, con preferencias guardadas en `localStorage`.
- 📱 Diseño adaptable a dispositivos móviles y escritorio.
- ⏳ Estados de carga y manejo de errores.
- 📊 Vercel Analytics.

Los datos meteorológicos se obtienen de la API de **Open-Meteo**.

## 💬 Próxima etapa: Comunidad Cielovivo

La próxima evolución del proyecto es incorporar un pequeño espacio comunitario pensado para amigos, conocidos y visitantes de Gualeguay, Entre Ríos.

### Funcionalidades previstas

- **Contador público de visitas:** mostrar el total de visitas registradas en Cielovivo.
- **Libro de visitas:** permitir que los visitantes dejen su nombre y un mensaje, y consulten los mensajes publicados.
- **Actualización en tiempo real:** mostrar los nuevos mensajes sin recargar la página.
- **Personas conectadas:** mostrar una cantidad aproximada de conexiones activas.
- **Seguridad básica:** validar los mensajes y limitar las operaciones permitidas.

### Contador de visitas

La primera funcionalidad prevista será un contador visible para todos los visitantes.

El criterio acordado es registrar **una visita por cada nueva sesión de navegación**:

- Recargar la misma pestaña no debe sumar otra visita.
- Volver a entrar en una nueva sesión puede registrar una nueva visita.
- Abrir otra pestaña puede contabilizarse como una sesión independiente.

La implementación prevista utilizará `sessionStorage` para recordar si la visita ya fue registrada durante la sesión de esa pestaña y **Firebase Realtime Database** para conservar el total compartido.

Este contador representará visitas registradas, no personas únicas. Si se utilizan distintas pestañas o dispositivos, o se reinicia la sesión del navegador, una misma persona puede generar más de una visita.

### Arquitectura propuesta

- **React + Vite:** mantener la aplicación actual publicada en Vercel.
- **Firebase Realtime Database:** almacenar el contador y evaluar su uso para los mensajes y la presencia.
- **Firebase Authentication anónima:** considerar una identificación técnica sin exigir registro visible a los visitantes.
- **Firebase Security Rules:** controlar las operaciones permitidas sobre los datos.
- **Firebase App Check:** evaluar una capa adicional de protección contra solicitudes no legítimas.

La prioridad es aprovechar el plan gratuito **Firebase Spark**, evitar un backend propio y mantener la arquitectura lo más sencilla posible.

El contador deberá utilizar operaciones seguras para evitar que las actualizaciones simultáneas sobrescriban el total. También se deberán considerar las limitaciones de un contador gestionado desde el cliente y los posibles incrementos abusivos.

## 🧰 Tecnologías actuales

- React
- JavaScript
- Vite
- CSS
- Open-Meteo API
- Leaflet y React Leaflet
- Embla Carousel React
- Vercel
- Vercel Analytics

## 🏗️ Organización del proyecto

La aplicación utiliza componentes reutilizables y hooks personalizados para separar la interfaz de la lógica de consulta del clima.

- `App.jsx`: estado general y búsqueda de ciudades.
- `WeatherCard.jsx`: composición de las secciones meteorológicas.
- Componentes meteorológicos: condiciones actuales, pronósticos, gráficas y mapa.
- `weatherService.js`: comunicación con Open-Meteo.
- `useWeather.js`: gestión de datos, carga y errores del clima.
- `useLocalStorage.js`: persistencia de preferencias locales.

## 🚀 Desarrollo local

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Comprobar el proyecto antes de publicar:

```bash
npm run lint
npm run build
```

## 🎨 Diseño y experiencia de usuario

La interfaz utiliza un estilo **Glassmorphism**, con jerarquía visual clara, superficies translúcidas y adaptación a los modos claro y oscuro.

También contempla diseño responsive, estados de foco visibles, contraste adecuado y respeto por la preferencia de movimiento reducido del sistema.

## 🗺️ Arquitectura actual

El flujo principal de consulta meteorológica es:

```text
Componentes React
       ↓
   Hooks
       ↓
weatherService.js
       ↓
  Open-Meteo API
       ↓
Datos meteorológicos
       ↓
Componentes de presentación
```

La comunidad se incorporará como una funcionalidad independiente de la consulta meteorológica, procurando que los posibles errores de Firebase no impidan utilizar el clima.

## 📌 Estado del proyecto

**Proyecto en evolución.**

La aplicación meteorológica se encuentra implementada y publicada. La Comunidad Cielovivo está en etapa de planificación.

El contador público de visitas será el primer objetivo de esta nueva etapa. El libro de visitas, la actualización en tiempo real y el indicador de conexiones activas quedan como funcionalidades futuras.

La integración con Firebase todavía no está implementada.

## 👨‍💻 Autor

Proyecto desarrollado por **Mariano Moreyra** como práctica profesional y aprendizaje continuo.