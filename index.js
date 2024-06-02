const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/weather", async (req, res) => {
	const { lat, lng } = req.query;

	try {
		const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
			params: {
				lat: lat,
				lon: lng,
				key: process.env.WEATHERBIT_API_KEY,
			},
		});

		res.json(response.data);
	} catch (error) {
		console.error("Error fetching weather data:", error);
		res.status(500).json({ error: "Failed to fetch weather data" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
