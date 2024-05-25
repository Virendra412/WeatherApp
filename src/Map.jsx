import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {Icon} from 'leaflet'

function Map({cord}) {
  return (
    <MapContainer center={[cord[0], cord[1]]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[cord[0], cord[1]]} icon={new Icon({iconUrl:"https://res.cloudinary.com/dhoha33eh/image/upload/v1716642370/marker_nfyney.png", iconSize: [40, 40], iconAnchor: [20, 41]})} />
        
      
    </MapContainer>
  );
}

export default Map;
