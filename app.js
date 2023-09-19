const express = require("express");
const app = express();
const touristPlacesRoutes = require("./src/routes/touristPlaces");

require("dotenv").config();

const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

app.get("/api/ping", (req, res) => {
	res.send("Pong");
});

// routes
app.use("/api/tourist-places", touristPlacesRoutes);

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
