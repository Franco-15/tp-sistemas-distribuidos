import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token suele ir después de "Bearer"

    if (!token) return res.status(401).json({ message: 'Acceso denegado, falta el token' });

    // Verificar el token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token no válido' });

        next();
    });
};

export default authenticateToken;






