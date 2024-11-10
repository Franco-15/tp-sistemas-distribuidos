import * as checkpointMethods from '../controllers/checkpoints.controller.js'

let parametros
let checkpoints 
 
const setHeaders= (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permite todas las fuentes
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS"); // Metodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With"); // Encabezados permitidos 
}

export const checkpointsRoute = (req, res) => {




    parametros = req.url.split("/") 
    parametros = parametros.filter(el => el != '')   //filtro los vacios
    if(req.method === 'GET'){ 
        setHeaders(res);
        if(parametros.length == 2){ //Entra en este if para obtener todos los checkpoints
            checkpoints = checkpointMethods.getPuntosControl()
            res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de los checkpoints'})
            res.write(checkpoints)
            return res.end()
        }else if(parametros.length == 3){ //Entra en este if para obtener un checkpoint
            checkpointMethods.getPuntoControl(parametros[2],res)
        }
    }else if(req.method === 'POST'){  //Entra en este if para agregar un checkpoint
        try{
            setHeaders(res);
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                if(!parsedBody.id || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                    res.writeHead(400, {'message':'No se pudo agregar al checkpoint debido a la falta de datos'})
                    res.end()
                    return;
                }else{
                    if (checkpointMethods.postPuntoControl(parsedBody)) {
                        res.writeHead(200, { 'message': 'Checkpoint agregado exitosamente' });
                    } else {
                        res.writeHead(400, { 'message': 'El checkpoint con este ID ya existe' });
                    }
                    return res.end();
                }
            })
        }catch (e){
            console.log('Error', e)
            res.writeHead(500, {'message':'Error del servidor, no se pudo agregar el checkpoint'})
            return res.end()
        }
    }else if(req.method === 'DELETE'){ 
        setHeaders(res);
        if(parametros.length == 2){ //Entra en este if para eliminar todos los checkpoints
            checkpointMethods.deletePuntosControl(req,res)
            res.writeHead(200,{'message':'Se eliminaron los punto de control'})
            return res.end()
        }else if(parametros.length == 3){ //Entra en este if para eliminar un checkpoint
            if (checkpointMethods.deletePuntoControl(parametros[2])) {
                res.writeHead(200, { 'message': 'Checkpoint eliminado exitosamente' });
            } else {
                res.writeHead(404, { 'message': 'El checkpoint buscado no existe o no se encuentra registrado en el sistema' });
            }
            return res.end();
        }
    }else if(req.method === 'PATCH'){ //Entra en este if para modificar un checkpoints
        try {
            setHeaders(res);
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                if(!parametros[1] || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                    res.writeHead(400, {'message':'No se pudo modificar el punto de control debido a la falta de datos'})
                    return res.end()
                }else{
                    const newCheckpoint = {
                        id: parametros[2],
                        lat: parsedBody.lat,
                        long: parsedBody.long,
                        description: parsedBody.description
                    }
                    if (checkpointMethods.patchPuntosControl(newCheckpoint)) {
                        res.writeHead(200, { 'message': 'Checkpoint modificado exitosamente' });
                    } else {
                        res.writeHead(404, { 'message': 'El checkpoint buscado no existe o no se encuentra registrado en el sistema' });
                    }
                    return res.end();
                }
            })
            
        }
        catch (e) {
            console.log('Error', e)
            res.writeHead(500,  {'message':'Error en el servidor, el checkpoint no ha sido modificado'}) 
            return res.end()
            }
    
    }  
    else{ //Ruta invalida
        res.writeHead(404, {'message':'Ruta no encontrada'})
        return res.end() 
    }

    
}
    

