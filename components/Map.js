import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = ({ weatherData = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [52.3676, 4.9041],
          8
        ); // Default to Amsterdam

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);
      }

      weatherData.forEach((city) => {
        const { coord, main, name } = city;
        const marker = L.marker([coord.lat, coord.lon]).addTo(
          mapInstanceRef.current
        );
        marker.bindPopup(`
          <b>${name}</b><br>
          Temp: ${main.temp} °C<br>
          Feels Like: ${main.feels_like} °C<br>
          Min Temp: ${main.temp_min} °C<br>
          Max Temp: ${main.temp_max} °C<br>
          Pressure: ${main.pressure} hPa<br>
          Humidity: ${main.humidity} %
        `);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [weatherData]);

  return (
    <div
      className="rounded-xl"
      ref={mapRef}
      id="map"
      style={{ height: "500px", width: "100%" }}
    ></div>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
