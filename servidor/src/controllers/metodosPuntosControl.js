import { readFileSync, writeFileSync, existsSync } from 'fs';

const FILE_PATH = "./data/checkpoints.json" //!Ver bien como poner direcciones que se capten desde cualquier punto

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

export const getPuntosControl = () => {
        const result = getJson()
        const response = {
            data: result
        }
        return JSON.stringify(response)
}

export const getPuntoControl = (idPtoControl,res) => {  //Entiendo que aca el req tendria la info sobre que animal se esta buscando
    const result = getJson()
    const buscado = result.findIndex((item) => {
        return item.id === idPtoControl
    })
    if (buscado < 0){
        res.writeHead(404, {'message':'Ruta no encontrada'});
        res.end()
        return
    }else{
        const checkpoint = JSON.stringify(result[buscado])
        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el checkpoint'})
        res.write(checkpoint)
        res.end()
        return
    }
}

export const postPuntoControl = (parsedBody,res) => {
    const result = getJson();

    const exists = result.findIndex((ptoControl) => ptoControl.id === parsedBody.id);
    if (exists > -1) {
        res.writeHead(400, {'message':'El punto de control con este ID ya existe'});
        res.end();
        return;
    }
    result.push(parsedBody);
    writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
}

export const deletePuntosControl  = (req,res) => {
    const result = getJson()
    writeFileSync(FILE_PATH,JSON.stringify({}),'utf-8')
}

export const deletePuntoControl  = (idPtoControl, res) => {
    const result = getJson()
    const buscado = result.findIndex((item) => item.id === idPtoControl);

    if (buscado < 0) {
        res.writeHead(404,  {'message':'Punto de control no encontrado'});
        res.end();
        return;
    }else{      
        result.splice(buscado, 1); 
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    }
    
}

export const patchPuntosControl = (newCheckpoint,res) => {
    const result = getJson();
    const buscado = result.findIndex((item) => {
        return item.id === newCheckpoint.id
    })
    if(buscado < 0){
        res.writeHead(404, {'message':'Ruta no encontrada'});
        res.end()
        return
    }else{
        const oldCheckpoint = result[buscado];
        result[buscado] = {
            id: newCheckpoint.id,
            lat: newCheckpoint.lat || oldCheckpoint.lat,
            long: newCheckpoint.long || oldCheckpoint.long,
            description: newCheckpoint.description || oldCheckpoint.description
        }
        writeFileSync(FILE_PATH, JSON.stringify(result),'utf-8')
    }
}