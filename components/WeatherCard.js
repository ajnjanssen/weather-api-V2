import React from "react";

const WeatherCard = ({ city, temperature, feelsLike, minTemp, maxTemp }) => {
  return (
    <tr>
      <td>{city}</td>
      <td>{temperature}</td>
      <td>{feelsLike}</td>
      <td>{minTemp}</td>
      <td>{maxTemp}</td>
    </tr>
  );
};

export default WeatherCard;
