import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH = "/servidor/src/data/puntosControl.json"

const getJson = () => {
    const fileExist = existsSync(FILE_PATH);
    if (fileExist) {
        const file = readFileSync(FILE_PATH, 'utf-8');
        const parsedFile = JSON.parse(file);
        return parsedFile;
    } else {
        return [];
    } 
} 

export const getPuntosControl = (req, res) => {
    try{
        const result = getJson()
        res.setHeader('Content-Type', 'application/json')
        const response = {
            data: result
        }
        res.end(JSON.stringify(response))
    }catch (e) {
        console.log(e)
        res.writeHead(500)
        res.end('Error')
    }
}

export const getPuntoControl = (idPtoControl,res) => {  //Entiendo que aca el req tendria la info sobre que animal se esta buscando
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idPtoControl
    })
    if (buscado < 0){
        res.writeHead(404, 'Ruta no encontrada');
        res.end()
        return
    }else{
        return result[buscado]
    }
}

export const postPuntoControl = (parsedBody,res) => {
    const result = getJson();

    const exists = result.some(ptoControl => ptoControl.id === parsedBody.id);
    if (exists) {
        res.writeHead(400, 'El punto de control con este ID ya existe');
        res.end();
        return;
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, result,'utf-8')
    res.end();
}

export const deletePuntosControl  = (req,res) => {
    const result = getJson()
    result.writeFileSync(FILE_PATH,JSON.stringify({}),'utf-8')
    res.end();
}

export const deletePuntoControl  = (idPtoControl, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idPtoControl);

    if (buscado < 0) {
        res.writeHead(404, 'Punto de control no encontrado');
        res.end();
        return;
    }else{      
        result.splice(buscado, 1); 
        writeFileSync(FILE_PATH, result,'utf-8')
        res.end();
    }
    
}