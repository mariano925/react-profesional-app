# 🌦️ React Profesional App

Aplicación de práctica en **React** para mostrar información del clima de distintas ciudades.  
Incluye componentes reutilizables, hooks personalizados y un servicio de datos, con arquitectura organizada en carpetas.

---

## 📂 Componentes

### `App.jsx`
- Punto de entrada principal de la aplicación.
- Maneja el estado global (`city`, `weather`, `error`).
- Conecta los componentes `SearchBar`, `WeatherCard`, `ErrorMessage` y `Loader`.
- Integra `WeatherProvider` y `useLocalStorage`.

### `SearchBar.jsx`
- Barra de búsqueda para ingresar el nombre de la ciudad.
- Dispara la función `onSearch` al enviar el formulario.

### `WeatherCard.jsx`
- Muestra los datos del clima: ciudad, temperatura y descripción.
- Se renderiza solo cuando hay información disponible.

### `ErrorMessage.jsx`
- Componente simple para mostrar mensajes de error.
- Ejemplo: “⚠️ No se pudo obtener el clima de esa ciudad.”

### `Loader.jsx`
- Indica que la aplicación está cargando datos.
- Mejora la experiencia de usuario durante las consultas.

---

## 🔑 Servicios

### `weatherService.js`
- Contiene la función `getWeather(city)`.
- Actualmente devuelve datos **mockeados** (simulados).
- Preparado para integrarse con una API pública (ej. OpenWeatherMap) usando `fetch`.

---

## 🪝 Hooks

### `useWeather.js`
- Encapsula la lógica de obtención de datos del clima.
- Maneja `loading`, `error` y `weather`.

### `useLocalStorage.js`
- Permite guardar y recuperar valores en `localStorage`.
- Ejemplo: recordar la última ciudad buscada.

### `useForm.js`
- Manejo de formularios controlados.
- Incluye funciones para cambios y reseteo.

---

## 🌐 Context

### `WeatherContext.jsx`
- Define un contexto global para compartir estado (`city`, `weather`) entre componentes.
- Se utiliza mediante `WeatherProvider`.

---

## 🚀 Objetivo
Practicar:
- Arquitectura modular en React.
- Manejo de estado y props.
- Integración futura con APIs externas.
- Buenas prácticas de commits y documentación.
- Uso de **hooks** y **context** para escalabilidad.

---

✍️ Creado por Mariano como proyecto de aprendizaje y práctica profesional.
