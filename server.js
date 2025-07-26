const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City parameter is required" });
    const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data;

        const result = {
          city: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph,
        };
        res.json(result);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'Failed to retrieve weather data',
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

