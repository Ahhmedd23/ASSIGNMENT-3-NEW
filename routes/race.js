const express = require('express');
const router = express.Router();
const Race = require('../models/race');

// Get all races
router.get('/', async (req, res) => {
    try {
        const races = await Race.find();
        res.render('races/index', { title: 'Race Tracker', races });
    } catch (err) {
        res.status(500).send('Error fetching races');
    }
});

// Add race page
router.get('/add', (req, res) => {
    res.render('races/add', { title: 'Add Race' });
});

// Add race
router.post('/add', async (req, res) => {
    try {
        const race = new Race(req.body);
        await race.save();
        res.redirect('/races');
    } catch (err) {
        res.status(500).send('Error saving race');
    }
});

// Edit race page
router.get('/edit/:id', async (req, res) => {
    try {
        const race = await Race.findById(req.params.id);
        res.render('races/edit', { title: 'Edit Race', race });
    } catch (err) {
        res.status(500).send('Error loading race');
    }
});

// Edit race
router.post('/edit/:id', async (req, res) => {
    try {
        await Race.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/races');
    } catch (err) {
        res.status(500).send('Error updating race');
    }
});

// Delete race
router.get('/delete/:id', async (req, res) => {
    try {
        await Race.findByIdAndDelete(req.params.id);
        res.redirect('/races');
    } catch (err) {
        res.status(500).send('Error deleting race');
    }
});

module.exports = router;
