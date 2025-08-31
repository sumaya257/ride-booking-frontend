import { useState} from "react";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import type { Location } from "@/redux/features/rider/rider.types";

interface MapPickerProps {
  onSelectLocation: (loc: Location, type: "pickup" | "destination") => void;
}

const libraries: ("places")[] = ["places"];
const mapContainerStyle = { width: "100%", height: "300px" };
const center = { lat: 23.8103, lng: 90.4125 }; // Dhaka default

export const MapPicker = ({ onSelectLocation }: MapPickerProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [pickupMarker, setPickupMarker] = useState<Location | null>(null);
  const [destMarker, setDestMarker] = useState<Location | null>(null);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult, type: "pickup" | "destination") => {
    if (!place.geometry || !place.geometry.location) return;
    const loc: Location = {
      address: place.formatted_address || "",
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    onSelectLocation(loc, type);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === "pickup" ? setPickupMarker(loc) : setDestMarker(loc);
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="space-y-2">
      <Autocomplete
        onPlaceChanged={() => {
          const input = document.getElementById("pickup") as HTMLInputElement;
          const place = (window as any).google.maps.places.Autocomplete(input).getPlace();
          handlePlaceSelect(place, "pickup");
        }}
      >
        <input id="pickup" placeholder="Pickup Address" className="w-full p-2 border rounded-lg" />
      </Autocomplete>

      <Autocomplete
        onPlaceChanged={() => {
          const input = document.getElementById("destination") as HTMLInputElement;
          const place = (window as any).google.maps.places.Autocomplete(input).getPlace();
          handlePlaceSelect(place, "destination");
        }}
      >
        <input id="destination" placeholder="Destination Address" className="w-full p-2 border rounded-lg" />
      </Autocomplete>

      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
        {pickupMarker && <Marker position={{ lat: pickupMarker.lat, lng: pickupMarker.lng }} />}
        {destMarker && <Marker position={{ lat: destMarker.lat, lng: destMarker.lng }} />}
      </GoogleMap>
    </div>
  );
};
