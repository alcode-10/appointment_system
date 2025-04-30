const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Availability = require('../models/availability');
const { protect } = require('../middleware/authmiddleware');

// Book an appointment (Students)
router.post('/app', protect, async (req, res) => {
    console.log('✅ Inside POST /api/appointments');
    console.log('User:', req.user);  // Add this
    try {
        const { availabilityId, professorId } = req.body;

        // Check if the availability exists
        const availability = await Availability.findById(availabilityId);
        if (!availability) {
            return res.status(404).json({ message: 'Availability slot not found' });
        }

        // Check if the professor is correct
        if (availability.professor.toString() !== professorId) {
            return res.status(400).json({ message: 'Professor mismatch' });
        }

        // Create the appointment
        const appointment = await Appointment.create({
            student: req.user._id,   // Logged-in student
            professor: professorId,
            availability: availabilityId,
        });

        // Mark the booked availability slot as "booked"
        availability.isBooked = true;
         await availability.save();

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all active appointments (for the logged-in student)
router.get('/student', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({
            student: req.user._id
            // status: { $ne: 'cancelled' }
        })
            .populate('professor', 'name email')
            .populate('availability', 'date time');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all active appointments (for the logged-in professor)
router.get('/professor', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({
            professor: req.user._id,
            status: { $ne: 'cancelled' }
        })
            .populate('student', 'name email')
            .populate('availability', 'date time');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Approve or reject appointment
router.patch('/status/:id', protect, async (req, res) => {
    const { status } = req.body; // status should be 'approved' or 'rejected'
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.professor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only professor can update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ message: `Appointment ${status} successfully` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Cancel an appointment (only by professor)
router.patch('/cancel/:id', protect, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Only professor can cancel
        if (appointment.professor.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only professor can cancel this appointment' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
