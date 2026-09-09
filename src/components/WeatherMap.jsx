import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./WeatherMap.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configuración del marcador de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Actualiza la posición del mapa cuando cambia la ciudad
function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 11, {
      duration: 1.5,
    });
  }, [center, map]);

  return null;
}

function WeatherMap({ latitude, longitude, city }) {
  if (latitude == null || longitude == null) {
    return null;
  }

  const position = [latitude, longitude];

  return (
    <section className="weather-map">
      <h3>📍 Ubicación</h3>

      <div className="weather-map-container">
        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              <strong>{city}</strong>
              <br />
              Lat: {latitude.toFixed(2)}
              <br />
              Lon: {longitude.toFixed(2)}
            </Popup>
          </Marker>

          <MapUpdater center={position} />
        </MapContainer>
      </div>
    </section>
  );
}

export default WeatherMap;