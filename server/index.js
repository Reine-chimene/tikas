const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const dictionaryRoutes = require('./routes/dictionary');
const lessonsRoutes = require('./routes/lessons');
const eventsRoutes = require('./routes/events');
const teamRoutes = require('./routes/team');
const messageRoutes = require('./routes/messages');
const pool = require('./db'); // Import de la connexion DB
const authRoutes = require('./routes/auth');

const app = express();

// MIDDLEWARES
app.use(helmet()); // Sécurité HTTP
app.use(cors());   // Autorise le Frontend à appeler l'API
app.use(morgan('dev')); // Log des requêtes dans la console
app.use(express.json()); // Permet de lire le JSON dans req.body
app.use('/api/dictionary', require('./routes/dictionary'));
app.use('/uploads', express.static('uploads'));

// TEST DE CONNEXION DB
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ Erreur de connexion à PostgreSQL :", err.stack);
    } else {
        console.log("✅ Connecté à PostgreSQL à :", res.rows[0].now);
    }
});

// app.use('/api/dictionary', dictionaryRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gallery', require('./routes/gallery'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});