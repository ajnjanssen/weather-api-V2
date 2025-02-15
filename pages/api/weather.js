import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { zip } = req.query;

    if (!zip) {
        return res.status(400).json({ error: 'Zip code is required' });
    }

    const apiKey = '9a947b2b6130ce57fb318b02748ff301';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},nl&APPID=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}