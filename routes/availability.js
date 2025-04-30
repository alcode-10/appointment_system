const express = require('express');
const router = express.Router();
const Availability = require('../models/availability');
const { protect } = require('../middleware/authmiddleware');

// Professors create availability slots
router.post('/', protect, async (req, res) => {
    console.log('--- Hitting POST /api/availability route ---');
    console.log('Body:', req.body);
    try {
        const { date, time } = req.body;

        // Validate
        if (!date || !time) {
            return res.status(400).json({ message: 'Date and time are required' });
        }

        // Create availability slot
        const availability = await Availability.create({
            professor: req.user._id,   // logged-in professor's ID
            date,
            time
        });

        res.status(201).json(availability);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all available slots of a specific professor (for students)
router.get('/professor/:id', protect, async (req, res) => {
    try {
      const slots = await Availability.find({ professor: req.params.id });
      res.status(200).json(slots);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// (Optional) Professors can view their own availability slots
router.get('/', protect, async (req, res) => {
    try {
        const slots = await Availability.find({ professor: req.user._id });
        res.status(200).json(slots);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
