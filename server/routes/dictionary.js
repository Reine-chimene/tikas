const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Récupérer tous les mots du dictionnaire
router.get('/', async (req, res) => {
    try {
        const allWords = await pool.query("SELECT * FROM dictionary ORDER BY word_tikar ASC");
        res.json(allWords.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur");
    }
});

// Ajouter un nouveau mot (sera utilisé par l'admin)
router.post('/',auth, async (req, res) => {
    try {
        const { word_tikar, word_french, phonetic, category } = req.body;
        const newWord = await pool.query(
            "INSERT INTO dictionary (word_tikar, word_french, phonetic, category) VALUES($1, $2, $3, $4) RETURNING *",
            [word_tikar, word_french, phonetic, category]
        );
        res.json(newWord.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;