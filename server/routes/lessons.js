const express = require('express');
const router = express.Router();
const pool = require('../db');

// Récupérer toutes les leçons publiées
router.get('/', async (req, res) => {
    try {
        const lessons = await pool.query("SELECT * FROM lessons WHERE published = true ORDER BY created_at DESC");
        res.json(lessons.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une leçon (Admin)
router.post('/', async (req, res) => {
    try {
        const { title, content_html, video_url, pdf_url, level } = req.body;
        const newLesson = await pool.query(
            "INSERT INTO lessons (title, content_html, video_url, pdf_url, level) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [title, content_html, video_url, pdf_url, level]
        );
        res.json(newLesson.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;