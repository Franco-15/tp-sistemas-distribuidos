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
    try{
        let body = '';
        req.on('data', (chunk) => {
            body = body + chunk;
        });
        req.on('end', () => {
            const parsedBody = JSON.parse(body);
            if(!parsedBody.username || !parsedBody.password){
                res.writeHead(400, {'message':'No se pudo verificar al usuario debido a la ausencia de datos'})
                return res.end()
            }else{
                const admin = getJson()
                console.log(admin[0])
                const hashedPassword = admin[0]["password"]
                bcrypt.compare(parsedBody.password, hashedPassword)
                    .then(isMatch => {
                        if (isMatch) {
                            res.writeHead(200,{'message':'Usuario logueado'})
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
        })
    }catch (e){
        console.log('Error', e)
        res.writeHead(500, {'message':'Error del servidor al intentar verificar la identidad del usuario'})
        return res.end()
    }
}