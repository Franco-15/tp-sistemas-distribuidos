import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token suele ir después de "Bearer"

    if (!token){
        res.writeHead(401,{message: 'Acceso denegado, falta el token'})
        res.end()
    }

    // Verificar el token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            res.writeHead(403,{message: 'Token inválido'})
            return res.end()
        }
        next();
    });
};

export default authenticateToken;






