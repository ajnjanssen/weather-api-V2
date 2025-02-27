import fetch from "node-fetch";

export default async function handler(req, res) {
  const { postalCode, countryCode } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${postalCode},${countryCode}&appid=${apiKey}&units=metric`;

  console.log(
    `Fetching weather data for postal code: ${postalCode}, country code: ${countryCode}`
  );
  console.log(`Using API URL: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: error.message });
  }
}
