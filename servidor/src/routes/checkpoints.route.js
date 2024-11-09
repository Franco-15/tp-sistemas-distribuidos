import express from 'express';
import * as checkpointMethods from '../controllers/checkpoints.controller.js';

const router = express.Router();


// GET todos los checkpoints
router.get('/', (req, res) => {
    try {
        const checkpoints = checkpointMethods.getPuntosControl();
        res.status(200).json({
            message: 'Se encontró el listado de los checkpoints',
            data: JSON.parse(checkpoints).data
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el listado de checkpoints' });
    }
});

// GET checkpoint específico
router.get('/:id', (req, res) => {
    try {
        const checkpoint = checkpointMethods.getPuntoControl(req.params.id);
        if (!checkpoint) {
            return res.status(404).json({ message: 'El checkpoint no existe' });
        }
        res.status(200).json(checkpoint);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el checkpoint' });
    }
});

// POST  Agregar un checkpoint
router.post('/', (req, res) => {
    const { id, lat, long, description } = req.body;

    if (!id || !lat || !long || !description) {
        return res.status(400).json({ message: 'No se pudo agregar el checkpoint debido a la falta de datos' });
    }

    try {
        checkpointMethods.postPuntoControl(req.body);
        res.status(200).json({ message: 'Checkpoint agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor, no se pudo agregar el checkpoint' });
    }
});

// DELETE  Eliminar todos los checkpoints
router.delete('/', (req, res) => {
    try {
        checkpointMethods.deletePuntosControl();
        res.status(200).json({ message: 'Se eliminaron los puntos de control' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar los puntos de control' });
    }
});

// DELETE  Eliminar un checkpoint específico
router.delete('/:id', (req, res) => {
    try {
        checkpointMethods.deletePuntoControl(req.params.id);
        res.status(200).json({ message: 'Checkpoint eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el checkpoint' });
    }
});

// PATCH /api/checkpoints/:id - Modificar un checkpoint
router.patch('/:id', (req, res) => {
    const { lat, long, description } = req.body;
    const { id } = req.params;

    if (!lat && !long && !description) {
        return res.status(400).json({ message: 'No se pudo modificar el checkpoint debido a la falta de datos' });
    }

    const newCheckpoint = { id, lat, long, description };

    try {
        checkpointMethods.patchPuntosControl(newCheckpoint);
        res.status(200).json({ message: 'Checkpoint modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar el checkpoint' });
    }
});

export default router;


/*import * as checkpointMethods from '../controllers/checkpoints.controller.js'

let parametros
let checkpoints 
 
export const checkpointsRoute = (req, res) => {
    parametros = req.url.split("/") 
    parametros = parametros.filter(el => el != '')   //filtro los vacios
    if(req.method === 'GET'){ 
        //setHeaders(res);
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
            //setHeaders(res);
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
                    checkpointMethods.postPuntoControl(parsedBody,res)
                    res.writeHead(200,{'message':'Se agrego el checkpoint'})
                    return res.end()
                }
            })
        }catch (e){
            console.log('Error', e)
            res.writeHead(500, {'message':'Error del servidor, no se pudo agregar el checkpoint'})
            return res.end()
        }
    }else if(req.method === 'DELETE'){ 
        //setHeaders(res);
        if(parametros.length == 2){ //Entra en este if para eliminar todos los checkpoints
            checkpointMethods.deletePuntosControl(req,res)
            res.writeHead(200,{'message':'Se eliminaron los punto de control'})
        }else if(parametros.length == 3){ //Entra en este if para eliminar un checkpoint
            checkpointMethods.deletePuntoControl(parametros[2],res)
            res.writeHead(200,{'message':'Se elimino el punto de control'})
        }
        return res.end()
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
                    checkpointMethods.patchPuntosControl(newCheckpoint,res)
                    res.writeHead(200,{'message':'El checkpoint ha sido modificado'})
                    return res.end()
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
    
*/
