const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Vérifier si l'utilisateur existe
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Identifiants invalides' });
        }

        // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants invalides' });
        }

        // 3. Créer le Token JWT
        const payload = { user: { id: user.rows[0].id, role: user.rows[0].role } };

        jwt.sign(payload, process.env.JWT_SECRET || 'secret_tikar_key', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, fullname: user.rows[0].fullname });
        });

    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});
// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // 1. Vérifier si l'utilisateur existe déjà
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(400).json({ msg: 'Cet utilisateur existe déjà' });
        }

        // 2. Crypter le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insérer dans la base de données
        const newUser = await pool.query(
            "INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, 'admin') RETURNING *",
            [fullname, email, hashedPassword]
        );

        // 4. Générer le Token pour connecter l'utilisateur immédiatement
        const payload = { user: { id: newUser.rows[0].id, role: newUser.rows[0].role } };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret_tikar_key', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, fullname: newUser.rows[0].fullname });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});
module.exports = router;