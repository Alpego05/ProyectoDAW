const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Acceso denegado. Token no proporcionado o formato incorrecto."
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expirado. Por favor, inicie sesión nuevamente."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Token inválido."
        });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado."
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "No tiene permiso para realizar esta acción."
            });
        }

        next();
    };
};

module.exports = { verifyToken, checkRole };