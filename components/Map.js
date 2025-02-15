import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mapContainer = document.getElementById("map");
      if (mapContainer && !mapContainer._leaflet_id) {
        // Ensure Leaflet isn't re-initialized
        const map = L.map(mapContainer).setView([52.23, 5.55], 7);
        window.map = map;

        L.tileLayer(
          `https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibnltcGg0NCIsImEiOiJjazczZnppMXEwYnMyM2tudmRkODRpcXN5In0.7Ni9qFzGMFQlwSzeou4L-g`,
          {
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
          }
        ).addTo(map);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=9a947b2b6130ce57fb318b02748ff301`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Weather data:", data);
            const marker = L.marker([data.coord.lat, data.coord.lon]).addTo(
              map
            );
            const tempCelsius = (data.main.temp - 273.15).toFixed(2);
            marker
              .bindPopup(`<b>${data.name}</b><br>Temperature: ${tempCelsius}°C`)
              .openPopup();
          })
          .catch((error) =>
            console.error("Error fetching weather data:", error)
          );
      }
    }
  }, []);

  return <div id="map" className="min-w-[600px] min-h-[800px]"></div>;
};

export default Map;
