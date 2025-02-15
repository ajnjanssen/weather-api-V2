# My Next.js Weather App

This project is a weather application built with Next.js that allows users to fetch and compare weather data for different cities. It utilizes the OpenWeatherMap API to retrieve weather information based on zip codes.

## Features

- Display current weather information including temperature, pressure, and humidity.
- Compare weather data for multiple cities stored in local storage.
- Interactive map integration for visual representation of weather data.

## Project Structure

```
my-nextjs-project
├── components
│   ├── WeatherCard.js        # Component to display weather information for a single city
│   └── WeatherComparison.js   # Component to compare weather information for multiple cities
├── pages
│   ├── api
│   │   └── weather.js        # API route to fetch weather data from OpenWeatherMap
│   ├── index.js              # Main entry point of the application
│   └── _app.js               # Custom App component for global styles
├── public
│   └── map.html              # HTML structure for the map
├── styles
│   └── globals.css           # Global CSS styles
├── package.json              # npm configuration file
├── next.config.js            # Next.js configuration settings
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-nextjs-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```
   NEXT_PUBLIC_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Enter a zip code in the input field to fetch the current weather data for that location.
- The weather information will be displayed in a card format.
- You can compare weather data for multiple cities, which will be stored in local storage.

## License

This project is licensed under the MIT License.