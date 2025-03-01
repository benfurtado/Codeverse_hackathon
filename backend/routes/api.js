import express from "express";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Add more routes here...

export default router;
