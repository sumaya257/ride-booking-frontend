import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  onSelect: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onSelect }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelect(lat, lng);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={[23.8103, 90.4125]}
      zoom={12}
      style={{ height: "200px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <Marker position={position} />}
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapPicker;
