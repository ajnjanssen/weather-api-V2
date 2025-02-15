import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

const WeatherComparison = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>City</th>
              <th>Temp (°C)</th>
              <th>Feels Like (°C)</th>
              <th>Min Temp (°C)</th>
              <th>Max Temp (°C)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          {weatherData &&
            weatherData.map((city, index) => (
              <WeatherCard
                key={index}
                city={city.name}
                temperature={city.main.temp}
                feelsLike={city.main.feels_like}
                minTemp={city.main.temp_min}
                maxTemp={city.main.temp_max}
                pressure={city.main.pressure}
                humidity={city.main.humidity}
              />
            ))}
        </table>
      </div>
    </div>
  );
};

export default WeatherComparison;
