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
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <MapContainer
        center={[52.3676, 4.9041]}
        className="rounded-xl"
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          className="map-tiles"
        />
        <TileLayer
          url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=9a947b2b6130ce57fb318b02748ff301"
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          className="map-tiles"
        />
        {location && <Marker position={[location.lat, location.lon]} />}
        <MapCenter location={location} />
      </MapContainer>
    </div>
  );
};

export default Map;
