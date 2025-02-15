import React, { useEffect, useState, useRef } from "react";
import WeatherTable from "./WeatherTable";

const WeatherComparison = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const prevWeatherDataRef = useRef();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/weather-comparison");
      if (!response.ok) {
        throw new Error("Failed to fetch weather comparison data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <WeatherTable weatherData={weatherData} />
    </div>
  );
};

export default WeatherComparison;
