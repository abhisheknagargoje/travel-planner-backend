const express = require("express");
const router = express.Router();
const {
	getNearestPlaces,
	getPlaceInfo,
} = require("../controllers/touristPlacesControllers");

router.get("/nearest", getNearestPlaces);
// router.get("/place-coordinates", getPlaceInfo);

module.exports = router;
