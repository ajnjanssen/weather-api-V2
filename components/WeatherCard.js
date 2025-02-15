import React from "react";

const WeatherCard = ({
  city,
  temperature,
  feelsLike,
  minTemp,
  maxTemp,
  pressure,
  humidity,
}) => {
  return (
    <tr>
      <th>1</th>
      <td>{city}</td>
      <td>{temperature}</td>
      <td>{feelsLike}</td>
      <td>{minTemp}</td>
      <td>{maxTemp}</td>
      <td>{pressure}</td>
      <td>{humidity}</td>
    </tr>
  );
};

export default WeatherCard;
