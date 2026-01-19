const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth'); // Ton middleware de protection

// --- 1. POST : Envoyer un message (Public - Page Contact) ---
router.post('/', async (req, res) => {
    try {
        const { sender_name, sender_email, message_content } = req.body;
        
        // Insertion dans la base de données
        const newMessage = await pool.query(
            "INSERT INTO messages (sender_name, sender_email, message_content, received_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [sender_name, sender_email, message_content]
        );

        res.json({ msg: "Message envoyé avec succès !", data: newMessage.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
});

// --- 2. GET : Lire les messages (Privé - Admin Dashboard) ---
router.get('/', auth, async (req, res) => {
    try {
        // On récupère tous les messages, les plus récents en premier
        const allMessages = await pool.query("SELECT * FROM messages ORDER BY received_at DESC");
        res.json(allMessages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    }
});

module.exports = router;