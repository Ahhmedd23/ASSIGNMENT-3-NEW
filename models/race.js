const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the race
    date: { type: Date, required: true },   // Date of the race
    location: { type: String, required: true },
    participants: { type: [String], required: true }, // Array of participants
    distance: { type: String, required: true }, // Type/Distance of the race
    winner: { type: String } // Winner (optional)
});

module.exports = mongoose.model('Race', raceSchema);
