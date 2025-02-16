import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ location }) => {
  const MapCenter = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lon], 13);
      }
    }, [location, map]);

    return null;
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[52.3676, 4.9041]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location && <Marker position={[location.lat, location.lon]} />}
        <MapCenter location={location} />
      </MapContainer>
    </div>
  );
};

export default Map;
