const express = require('express');
const router = express.Router();
const Target = require('../models/Target');

// Existing Route: Add a target
router.post('/add', async (req, res) => {
    try {
        const newTarget = new Target(req.body);
        const savedTarget = await newTarget.save();
        res.status(201).json(savedTarget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Existing Route: Get all targets
router.get('/all', async (req, res) => {
    try {
        const targets = await Target.find();
        res.json(targets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- NEW CHANGE START ---
// Route to delete all monitored websites
router.delete('/clear-all', async (req, res) => {
    try {
        await Target.deleteMany({});
        res.json({ message: "All targets cleared successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// --- NEW CHANGE END ---

module.exports = router;
