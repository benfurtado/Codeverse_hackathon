import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import multer from "multer";
import identifyPlant from "./controllers/plantIdentifier.js"; // Correct import

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

// Route to identify plant from image
app.post("/identify", upload.any(), async (req, res) => {
    try {
        const bestMatch = await identifyPlant(req.files, req.body.organs);
        console.log(bestMatch.commonNames);
        res.json(bestMatch);
    } catch (error) {
        console.error("Error in /identify route:", error.message);
        res.status(500).json({ error: error.message || "Server error" });
    }
});

// Use the API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));