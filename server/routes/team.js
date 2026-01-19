const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const members = await pool.query("SELECT * FROM team ORDER BY display_order ASC");
        res.json(members.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;