const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model (professor)
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,  // New field
    },
});

module.exports = mongoose.model('Availability', availabilitySchema);
