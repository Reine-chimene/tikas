const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lire le token depuis le header
    const token = req.header('x-auth-token');

    // Vérifier si pas de token
    if (!token) {
        return res.status(401).json({ msg: "Pas de token, autorisation refusée" });
    }

    try {
        const decoded = jwt.verify(token, 'ton_code_secret_jwt');
        req.admin = decoded.admin;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token non valide" });
    }
};