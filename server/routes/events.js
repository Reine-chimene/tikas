const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const events = await pool.query("SELECT * FROM events ORDER BY event_date ASC");
        res.json(events.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, event_date, location, image_poster_url } = req.body;
        const newEvent = await pool.query(
            "INSERT INTO events (title, description, event_date, location, image_poster_url) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [title, description, event_date, location, image_poster_url]
        );
        res.json(newEvent.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;