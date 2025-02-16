export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `/api/weather-comparison?location=${location}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather comparison data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
