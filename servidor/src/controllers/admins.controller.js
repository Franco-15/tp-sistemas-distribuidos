import { readFileSync,  existsSync } from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const FILE_PATH =  './src/data/admin.json' 


export const getJson = () => {
    const fileExist = existsSync(FILE_PATH);
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');
        const parsedFile = JSON.parse(file);
        return parsedFile;
    } else {
        return [];
    } 
} 

//Metodo para loguear al usuario en el sistema
export const validUser = (req,res) =>{
    try {
        
        const authHeader = req.headers['authorization'];
        const encoded = authHeader && authHeader.split(' ')[1];
        const decoded = atob(encoded);
        const decodedArray = decoded.split(':');
        const username = decodedArray[0]; 
        const password = decodedArray[1]; 

        if (!authHeader) {
            res.writeHead(400, { 'message': 'No se pudo verificar al usuario debido a la ausencia del header de autorizacion' });
            return res.end();
        }

        if (!username || !password) {
            res.writeHead(400, {'message':'No se pudo verificar al usuario debido a la ausencia de datos'})
            return res.end()
        }else{
            const admin = getJson()
            if(username == admin[0]["username"]){
                const hashedPassword = admin[0]["password"]
                bcrypt.compare(password, hashedPassword)
                    .then(isMatch => {
                        if (isMatch) {
                            const id = admin[0]["id"]
                            res.writeHead(200,{'Content-Type': 'application/json', 'message':'Usuario logueado'})
                            const accessToken = jwt.sign({ id:username },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' }); //5 min
                            const refreshToken = jwt.sign({ id:username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
                            res.write(JSON.stringify({accessToken:accessToken,refreshToken:refreshToken,id:id}))
                            return res.end()
                        } else {
                            res.writeHead(401,{'message':'Password invalido'}) 
                            return res.end()
                        }
                    })
                    .catch(error => {   
                        res.writeHead(500,{'message':'Error al comparar la contraseña'}) 
                        return res.end()
                    });
            }else{
                res.writeHead(401,{'message':'Usuario invalido'}) 
                return res.end()
            }
        }
        
    }catch (e){
        res.writeHead(500, {'message':'Error del servidor al intentar verificar la identidad del usuario'})
        return res.end()
    }
}


//Metodo para refrescar el access token del usuario
export const refreshUser  = (req,res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Separamos el token del Bearer
    if (!token){
        res.writeHead(401,{'message':'Acceso denegado, falta el token'}) 
        return res.end()
    } 
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
            res.writeHead(403,{'message':'Token invalido'}) 
            return res.end()
        } 
        const admin = getJson()
        const id = admin[0]["id"]
        res.writeHead(200,{'Content-Type': 'application/json', 'message':'Nuevo token de acceso brindado'})
        const accessToken = jwt.sign({ id:id },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' });
        res.write(JSON.stringify({accessToken:accessToken,refreshToken:token}))
        return res.end()
    });
}