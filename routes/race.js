const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported for debug purposes
const router = express.Router();
const Race = require('../models/race');

// Get all races
router.get('/', async (req, res) => {
    try {
        console.log('Attempting to fetch all races...');
        const races = await Race.find();
        console.log('Fetched races:', races);
        res.render('races/index', { title: 'Race Tracker', races });
    } catch (err) {
        console.error('Error fetching races:', err.message);
        res.status(500).send('Error fetching races');
    }
});

// Add race page
router.get('/add', (req, res) => {
    console.log('Rendering Add Race page'); // Debug log for rendering add race page
    res.render('races/add', { title: 'Add Race' });
});

// Add race
router.post('/add', async (req, res) => {
    try {
        // Log incoming form data
        console.log('Form Data Received:', req.body);

        // Create a new Race object based on the schema
        const race = new Race({
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            participants: req.body.participants.split(',').map(participant => participant.trim()),
            distance: req.body.distance,
            winner: req.body.winner || null, // Optional winner
        });

        // Log the constructed Race object before saving
        console.log('Race Object Before Save:', race);

        // Save the race to MongoDB
        await race.save();

        // Log success and redirect
        console.log('Race Saved Successfully');
        res.redirect('/races');
    } catch (err) {
        // Log error details
        console.error('Error Saving Race:', err.message);
        console.error('Error Stack Trace:', err.stack);

        // Respond with error message
        res.status(500).send('Error saving race: ' + err.message);
    }
});

// Edit race page
router.get('/edit/:id', async (req, res) => {
    try {
        console.log('Loading race for editing, ID:', req.params.id); // Debug log for ID
        const race = await Race.findById(req.params.id);
        console.log('Race found for editing:', race); // Debug log for the race found
        res.render('races/edit', { title: 'Edit Race', race });
    } catch (err) {
        console.error('Error loading race:', err.message); // Debug log for errors
        res.status(500).send('Error loading race');
    }
});

// Edit race
router.post('/edit/:id', async (req, res) => { // Corrected to handle editing
    try {
        console.log('Updating race, ID:', req.params.id);
        console.log('Updated Data:', req.body);

        // Update race in MongoDB
        await Race.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            participants: req.body.participants.split(',').map(participant => participant.trim()),
            distance: req.body.distance,
            winner: req.body.winner || null,
        });

        console.log('Race updated successfully');
        res.redirect('/races');
    } catch (err) {
        console.error('Error updating race:', err.message);
        res.status(500).send('Error updating race: ' + err.message);
    }
});

// Delete race
router.get('/delete/:id', async (req, res) => {
    try {
        console.log('Deleting race, ID:', req.params.id); // Debug log for deletion ID
        await Race.findByIdAndDelete(req.params.id);
        console.log('Race deleted successfully'); // Debug log for success
        res.redirect('/races');
    } catch (err) {
        console.error('Error deleting race:', err.message); // Debug log for errors
        res.status(500).send('Error deleting race');
    }
});

module.exports = router;
