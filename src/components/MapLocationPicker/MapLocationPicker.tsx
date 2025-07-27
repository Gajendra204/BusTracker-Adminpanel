import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {API_BASE_URL} from "../../api/axiosConfig.ts";

const createCustomMarker = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color:#3388ff; width:24px; height:24px; border-radius:50%; border:2px solid white"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapLocationPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

export const MapLocationPicker = ({
  onLocationSelect,
  initialPosition = [28.5339, 77.2111],
}: MapLocationPickerProps) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<L.Map>(null);
  const markerRef = useRef<L.Marker>(null);

  const handleSearch = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/geocode?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPos);
        mapRef.current?.flyTo(newPos, 15);
        onLocationSelect(newPos[0], newPos[1]);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const eventHandlers = {
    dragend: () => {
      const marker = markerRef.current;
      if (marker) {
        const newPos = marker.getLatLng();
        setPosition([newPos.lat, newPos.lng]);
        onLocationSelect(newPos.lat, newPos.lng);
      }
    },
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location (e.g. Eiffel Tower)"
          className="flex-1 p-2 border rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e as any)}
        />
        <button
          onClick={handleSearch}
          type="button" 
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Search
        </button>
      </div>

      <div className="h-64 w-full rounded-lg overflow-hidden border">
        <MapContainer
          center={initialPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {position && (
            <Marker
              position={position}
              icon={createCustomMarker()}
              draggable={true}
              eventHandlers={eventHandlers}
              ref={markerRef}
            >
              <Popup>Drag to adjust position</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {position && (
        <div className="text-sm text-gray-600">
          Latitude: {position[0].toFixed(6)}, Longitude:{" "}
          {position[1].toFixed(6)}
        </div>
      )}
    </div>
  );
};
