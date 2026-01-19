const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Config Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// GET - Public
router.get('/', async (req, res) => {
    try {
        const photos = await pool.query("SELECT * FROM gallery ORDER BY created_at DESC");
        res.json(photos.rows);
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

// POST - Admin + Upload
router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const { title, description } = req.body;
        const image_url = `http://localhost:5000/uploads/${req.file.filename}`;
        
        const newPhoto = await pool.query(
            "INSERT INTO gallery (title, image_url, description) VALUES ($1, $2, $3) RETURNING *",
            [title, image_url, description]
        );
        res.json(newPhoto.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erreur lors de l'upload" });
    }
});

// CETTE LIGNE EST LA PLUS IMPORTANTE :
module.exports = router;