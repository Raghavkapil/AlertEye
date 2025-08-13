import express from "express";
import Incident from "../models/Incident.js";

const router = express.Router();

// POST: Log new incident
router.post("/", async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    if (!userId || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newIncident = new Incident({ userId, latitude, longitude });
    await newIncident.save();

    res.status(201).json({ message: "Incident logged successfully" });
  } catch (error) {
    console.error("Error logging incident:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
