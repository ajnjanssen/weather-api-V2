import React, { useState, useEffect } from "react";
import { fetchWeather } from "../utils/weatherApi";

const WeatherComponent = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data</p>;

  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherComponent;
