import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Map({cord}) {
  return (
    <MapContainer center={[cord[0], cord[1]]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[cord[0], cord[1]]}>
        
      </Marker>
    </MapContainer>
  );
}

export default Map;
