import { useState } from "react";
import dynamic from "next/dynamic";
import WeatherCard from "../components/WeatherCard";
import WeatherComparison from "../components/WeatherComparison";

// Dynamically import the Leaflet component to avoid SSR issues
const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiKey = "9a947b2b6130ce57fb318b02748ff301";
    const countryCode = "NL"; // Default country code
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  return (
    <div>
      <h1 className="text-6xl font-bold">Weather App</h1>
      <div className="flex gap-8">
        <div className="w-full">
          <form className="" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              value={zipCode}
              onChange={handleInputChange}
              placeholder="Enter Zip Code"
            />
            <button className="btn" type="submit">
              Get Weather
            </button>
          </form>
          {weatherData && <WeatherCard data={weatherData} />}
          <WeatherComparison />
        </div>
        <Map />
      </div>
    </div>
  );
}
