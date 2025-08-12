const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

// POST: Create new incident
router.post("/", async (req, res) => {
    try {
        const { userId, latitude, longitude } = req.body;
        if (!userId || !latitude || !longitude) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newIncident = new Incident({ userId, latitude, longitude });
        await newIncident.save();

        res.status(201).json({ message: "Incident reported successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// GET: Fetch all incidents (for admin use)
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find().sort({ timestamp: -1 });
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
