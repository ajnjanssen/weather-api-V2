import React, { useEffect, useState, useRef } from "react";
import WeatherTable from "./WeatherTable";

const WeatherComparison = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const prevWeatherDataRef = useRef();

  const fetchData = async (postalCode) => {
    const countryCode = "nl"; // Set the country code
    const fullPostalCode = `${postalCode},${countryCode}`;
    try {
      const response = await fetch(
        `/api/weather-comparison?postalCode=${fullPostalCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather comparison data");
      }
      const data = await response.json();
      setWeatherData((prevData) => [...prevData, data]);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (weatherData && weatherData !== prevWeatherDataRef.current) {
      // Update the map view with the new weather data
      updateMapView(weatherData);
      prevWeatherDataRef.current = weatherData;
    }
  }, [weatherData]);

  const updateMapView = (data) => {
    // Implement the logic to update the map view with the new weather data
    console.log("Updating map view with data:", data);
  };

  const handleGetWeather = () => {
    fetchData(postalCode);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Enter postal code"
      />
      <button onClick={handleGetWeather}>Get Weather</button>
      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default WeatherComparison;
