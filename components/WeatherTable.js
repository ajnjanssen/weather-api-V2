import React from "react";

const WeatherTable = ({ weatherData }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto rounded-box border border-base-content/5 bg-base-100 max-h-92">
      <table className="table">
        <thead>
          <tr>
            <th>City</th>
            <th>Temp (°C)</th>
            <th>Feels Like (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Max Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData &&
            weatherData.map((city, index) => (
              <tr key={index}>
                <td>{city.name}</td>
                <td>{city.main.temp}</td>
                <td>{city.main.feels_like}</td>
                <td>{city.main.temp_min}</td>
                <td>{city.main.temp_max}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
