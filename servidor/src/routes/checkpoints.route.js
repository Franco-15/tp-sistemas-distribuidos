import * as checkpointMethods from '../controllers/checkpoints.controller.js'

//Clase en la que se manejan todas las rutas finales asociadas a checkpoints

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
        if(parametros.length == 2){ // GET /api/checkpoints - Obtener todos los checkpoints
            checkpoints = checkpointMethods.getPuntosControl()
            res.writeHead(200,{'Content-Type': 'application/json'})
            res.write(checkpoints)
            return res.end()
        }else if(parametros.length == 3){ // GET /api/checkpoints/:id - Obtener un checkpoint especifico
            checkpointMethods.getPuntoControl(parametros[2],res)
        }
    }else if(req.method === 'POST'){  // POST /api/checkpoints - Agregar un checkpoint
        try{
            setHeaders(res);
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                if(!parsedBody.id || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                    res.writeHead(400, 'No se pudo agregar al checkpoint debido a la falta de datos')
                    res.end()
                    return;
                }else{
                    if (checkpointMethods.postPuntoControl(parsedBody)) {
                        res.writeHead(200, 'Checkpoint agregado exitosamente' );
                    } else {
                        res.writeHead(400, 'El checkpoint con este ID ya existe');
                    }
                    return res.end();
                }
            })
        }catch (e){
            console.log('Error', e)
            res.writeHead(500, 'Error del servidor, no se pudo agregar el checkpoint')
            return res.end()
        }
    }else if(req.method === 'DELETE'){ 
        setHeaders(res);
        if(parametros.length == 2){ // DELETE /api/checkpoints - Eliminar todos los checkpoints
            checkpointMethods.deletePuntosControl(req,res)
            res.writeHead(200,'Se eliminaron los punto de control')
            return res.end()
        }else if(parametros.length == 3){ // DELETE /api/checkpoints/:id - Eliminar un checkpoint específico
            if (checkpointMethods.deletePuntoControl(parametros[2])) {
                res.writeHead(200, 'Checkpoint eliminado exitosamente');
            } else {
                res.writeHead(404, 'El checkpoint buscado no existe o no se encuentra registrado en el sistema');
            }
            return res.end();
        }
    }else if(req.method === 'PATCH'){ // PATCH /api/checkpoints/:id - Modificar un checkpoint
        try {
            setHeaders(res);
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                if(!parametros[1] || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                    res.writeHead(400, 'No se pudo modificar el punto de control debido a la falta de datos')
                    return res.end()
                }else{
                    const newCheckpoint = {
                        id: parametros[2],
                        lat: parsedBody.lat,
                        long: parsedBody.long,
                        description: parsedBody.description
                    }
                    if (checkpointMethods.patchPuntosControl(newCheckpoint)) {
                        res.writeHead(200, 'Checkpoint modificado exitosamente' );
                    } else {
                        res.writeHead(404, 'El checkpoint buscado no existe o no se encuentra registrado en el sistema');
                    }
                    return res.end();
                }
            })
            
        }
        catch (e) {
            console.log('Error', e)
            res.writeHead(500, 'Error en el servidor, el checkpoint no ha sido modificado') 
            return res.end()
            }
    
    }  
    else{ //Ruta invalida
        res.writeHead(404,'Ruta no encontrada')
        return res.end() 
    }

    
}
    

