import { readFileSync, writeFileSync, existsSync } from 'fs';
import bcrypt from 'bcrypt';
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
        
        const authHeader = req.headers['authorization'];
        
           if (!authHeader) {
            res.writeHead(400, { 'message': 'No se pudo verificar al usuario debido a la ausencia del header de autorizacion' });
            return res.end();
        }

        const { username, password } = JSON.parse(authHeader);
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
                        res.writeHead(200,{'message':'Usuario logueado'})
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