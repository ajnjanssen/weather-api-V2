import React, { useEffect, useState, useRef } from "react";
import WeatherTable from "./WeatherTable";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

const WeatherComparison = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const prevWeatherDataRef = useRef();

  useEffect(() => {
    // Retrieve weather data from local storage on mount
    const storedWeatherData =
      JSON.parse(localStorage.getItem("weatherData")) || [];
    setWeatherData(storedWeatherData);
  }, []);

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
      const newData = { ...data, addedAt: new Date().toISOString() };
      const updatedWeatherData = [...weatherData, newData];
      setWeatherData(updatedWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData));
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

  // Sort weather data based on the time they were added
  const sortedWeatherData = weatherData.sort(
    (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
  );

  return (
    <div className="flex gap-8 border border-base-content/5 rounded-box p-8">
      <div>
        <div className="flex space-x-4 w-full py-4 min-h-16">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
              type="search"
              className="grow"
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
          <button className="btn btn-primary px-8" onClick={handleGetWeather}>
            Get Weather
          </button>
        </div>
        <WeatherTable weatherData={sortedWeatherData} />
      </div>
      <Map weatherData={sortedWeatherData} />
    </div>
  );
};

export default WeatherComparison;
