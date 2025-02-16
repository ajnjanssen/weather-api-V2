import React, { useEffect, useState, useRef } from "react";
import WeatherTable from "./WeatherTable";
import dynamic from "next/dynamic";
import Notify from "./notify";

const Map = dynamic(() => import("./Map"), { ssr: false });

const WeatherComparison = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [location, setLocation] = useState(null);
  const prevWeatherDataRef = useRef();

  useEffect(() => {
    // Retrieve weather data from local storage on mount
    const storedWeatherData =
      JSON.parse(localStorage.getItem("weatherData")) || [];
    setWeatherData(storedWeatherData);
  }, []);

  const fetchData = async (postalCode) => {
    const countryCode = "nl"; // Set the country code
    try {
      const response = await fetch(
        `/api/weather-comparison?postalCode=${postalCode}&countryCode=${countryCode}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        setNotifications([
          {
            type: "error",
            message: `Postalcode not found: ${postalCode}`,
          },
        ]);
        return;
      }
      const data = await response.json();
      const newData = { ...data, addedAt: new Date().toISOString() };

      // Check for duplicate entries and update if necessary
      const updatedWeatherData = weatherData.filter(
        (item) => item.name !== data.name
      );
      updatedWeatherData.push(newData);

      setWeatherData(updatedWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData));
      setLocation({ lat: data.coord.lat, lon: data.coord.lon });
      setNotifications([
        { type: "success", message: "Weather data fetched successfully" },
      ]);
    } catch (err) {
      setNotifications([
        { type: "error", message: "Error fetching data: " + err.message },
      ]);
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

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      setPostalCode(value);
    }
  };

  // Sort weather data based on the time they were added
  const sortedWeatherData = weatherData.sort(
    (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 border border-base-content/5 rounded-box p-8">
      <Notify notifications={notifications} />
      <div>
        <div className="flex flex-col lg:flex-row space-x-4 w-full py-4 min-h-16 gap-4">
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
              onChange={handlePostalCodeChange}
              placeholder="Enter postal code"
              type="number"
              maxLength="4"
              className="grow"
            />
          </label>
          <button className="btn btn-secondary px-8" onClick={handleGetWeather}>
            Get Weather
          </button>
        </div>
        <WeatherTable weatherData={sortedWeatherData} />
      </div>
      <div
        className="h-full z-20"
        style={{ height: "550px", width: "100%", minHeight: "400px" }}
      >
        <Map location={location} />
      </div>
    </div>
  );
};

export default WeatherComparison;
