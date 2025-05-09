const jwt = require('jsonwebtoken');

// Middleware para verificar token
/*const verifyToken = (req, res, next) => {
    // Obtener el token del header, query o cookies
    const token = req.headers['authorization']?.split(' ')[1] ||
        req.query.token ||
        req.cookies?.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Se requiere un token para autenticación'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado'
        });
    }
};

//module.exports = { verifyToken }; */