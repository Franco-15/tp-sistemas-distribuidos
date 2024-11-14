import jwt from 'jsonwebtoken';


//Metodo el cual se encarga de autenticar el access token cada vez que llega una request
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Separamos el token del Bearer

    if (!token){
        res.writeHead(401,{message: 'Acceso denegado, falta el token'})
        return res.end()
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            res.writeHead(403,{message: 'Token inválido'})
            return res.end()
        }
        next();
    });
};

export default authenticateToken;






