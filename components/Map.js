import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.map) {
      const map = L.map("map").setView([52.23, 5.55], 7);
      window.map = map;

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          maxZoom: 18,
          id: "mapbox/dark-v9",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoibnltcGg0NCIsImEiOiJjazczZnppMXEwYnMyM2tudmRkODRpcXN5In0.7Ni9qFzGMFQlwSzeou4L-g",
        }
      ).addTo(map);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const marker = L.marker([data.coord.lat, data.coord.lon]).addTo(map);
          marker
            .bindPopup(`<b>${data.name}</b><br>Temperature: ${data.main.temp}K`)
            .openPopup();
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default Map;
