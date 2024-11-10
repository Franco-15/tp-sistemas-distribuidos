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
                        const accessToken = jwt.sign({ id:username },process.env.ACCESS_TOKEN_SECRET ,{ expiresIn: '5m' });
                        const refreshToken = jwt.sign({ id:username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60m' });
                        res.write(JSON.stringify({accessToken:accessToken,refreshToken:refreshToken,id:id}))
                        return res.end()
                    } else {
                        res.writeHead(400,{'message':'Password invalido'}) 
                        return res.end()
                    }
                })
                .catch(error => {
                    res.writeHead(400,{'message':'Error al comparar la contraseña'}) 
                    return res.end()
                });
        }
        
    }catch (e){
        console.log('Error', e)
        res.writeHead(500, {'message':'Error del servidor al intentar verificar la identidad del usuario'})
        return res.end()
    }
}