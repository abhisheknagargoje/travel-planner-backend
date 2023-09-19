const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.OPEN_TRIP_MAP_API_KEY;
const apiBaseUrl = "https://api.opentripmap.com/0.1/en/places/";

const getPlaceInfo = async (placeName) => {
	try {
		const apiUrl = `${apiBaseUrl}geoname?name=${placeName}&apikey=${apiKey}`;
		const response = await axios.get(apiUrl);
		const placedata = response.data;
		return placedata;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const getNearestPlaces = async (req, res) => {
	const { place } = req.query;
	const placedata = await getPlaceInfo(place);
	// res.send(placedata);
	if (!placedata) return;

	// Retrieve user-provided coordinates from the request query or request body
	const longitude = placedata.lon;
	const latitude = placedata.lat;

	try {
		// Make a request to the OpenTripMap API to get nearest places
		const apiUrl = `${apiBaseUrl}radius?radius=100000&lon=${longitude}&lat=${latitude}&rate=3&format=json&apikey=${apiKey}`;

		const response = await axios.get(apiUrl);
		const nearestPlaces = response.data;

		res.status(200).json(nearestPlaces);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "An error occurred while fetching nearest tourist places",
		});
	}
};

module.exports = {
	getNearestPlaces,
};
