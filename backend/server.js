const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Config
dotenv.config();

// Imports
const userRoutes = require("./Routes/userRoutes");
const identifyPlant = require("./python/plantIdentifier.js");
const { getPlantData } = require("./python/plantInfo.js");
const plant = require("./Routes/plants.js");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const upload = multer({ dest: "uploads/" });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/plants", plant);

// Plant Identification Route
app.post("/api/identify", upload.any(), async (req, res) => {
    try {
        const bestMatch = await identifyPlant(req.files, req.body.organs);
        console.log(bestMatch.commonNames);
        res.json(bestMatch);
    } catch (error) {
        console.error("Error in /api/identify route:", error.message);
        res.status(500).json({ error: error.message || "Server error" });
    }
});

// Plant Data Route
app.get("/api/plant/:name", async (req, res) => {
    const plantName = req.params.name;

    try {
        const plantData = await getPlantData(plantName);

        if (plantData.error) {
            return res.status(404).json({ error: plantData.error });
        }

        res.json(plantData);
    } catch (error) {
        console.error("Error in /api/plant/:name route:", error.message);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Default Route
app.get("/", (req, res) => {
    res.send("Backend server is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
