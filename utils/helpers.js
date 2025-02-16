export const saveToLocalStorage = (key, data) => {
  try {
    console.log(`Saving data to localStorage with key: ${key}`);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage with key: ${key}`, error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    console.log(`Getting data from localStorage with key: ${key}`);
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(
      `Error getting data from localStorage with key: ${key}`,
      error
    );
    return [];
  }
};

export const sortWeatherDataByDate = (weatherData) => {
  try {
    console.log("Sorting weather data by date");
    return weatherData.sort(
      (a, b) => new Date(a.addedAt) - new Date(b.addedAt)
    );
  } catch (error) {
    console.error("Error sorting weather data by date", error);
    return weatherData;
  }
};
