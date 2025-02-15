import fetch from 'node-fetch';

export default async function handler(req, res) {
    const cities = ['Amsterdam', 'Rotterdam', 'Utrecht']; // Example cities

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const weatherData = [];

    try {
        for (const city of cities) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data for ${city}`);
            }
            const data = await response.json();
            weatherData.push({
                name: city,
                main: data.main,
            });
        }
        res.status(200).json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
