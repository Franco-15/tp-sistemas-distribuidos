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

export const validUser = (req,res) =>{
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.writeHead(400, {'message':'No se pudo verificar al usuario debido a la ausencia de datos'})
            return res.end()
        }else{
            const admin = getJson()
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
        }
        
    }catch (e){
        console.log('Error', e)
        res.writeHead(500, {'message':'Error del servidor al intentar verificar la identidad del usuario'})
        return res.end()
    }
}

export const refreshUser  = (req,res) =>{
    //const { token } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token suele ir después de "Bearer"
    if (!token){
        res.writeHead(401,{'message':'Acceso denegado, falta el token'}) 
        return res.end()
    } 
    console.log("Paso primer chequeo")
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){
            res.writeHead(403,{'message':'Token invalido'}) 
            return res.end()
        } 
        const admin = getJson()
        const id = admin[0]["id"]
        console.log("Paso segundo chequeo")
        res.writeHead(200,{'Content-Type': 'application/json', 'message':'Nuevo token de acceso brindado'})
        console.log("Paso tercer chequeo")
        const accessToken = jwt.sign({ id:id },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' });
        console.log("Paso cuarto chequeo")
        res.write(JSON.stringify({accessToken:accessToken,refreshToken:token}))
        console.log("Paso quinto chequeo")
        return res.end()
    });
}