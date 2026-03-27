const express = require('express');
const router = express.Router();
const Target = require('../models/Target');

// 1. Add a target
// Frontend calls: ${API_BASE_URL}/api/targets/add
router.post('/add', async (req, res) => {
    try {
        const newTarget = new Target(req.body);
        const savedTarget = await newTarget.save();
        res.status(201).json(savedTarget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. Get all targets (RENAME THIS FROM /all TO /status)
// Frontend calls: ${API_BASE_URL}/api/targets/status
router.get('/status', async (req, res) => {
    try {
        const targets = await Target.find();
        res.json(targets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Delete all monitored websites
// Frontend calls: ${API_BASE_URL}/api/targets/clear-all
router.delete('/clear-all', async (req, res) => {
    try {
        await Target.deleteMany({});
        res.json({ message: "All targets cleared successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
