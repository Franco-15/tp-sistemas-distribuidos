import * as metodosPuntosControl from '../controllers/metodosPuntosControl.js'

let parametros
let checkpoints 
 
export const checkpointsRoute = (req, res) => {
    parametros = req.url.split("/") 
    parametros = parametros.filter(el => el != '')   //filtro los vacios
    if(req.method === 'GET'){
        setHeaders(res);
        if(parametros.length == 2){
            checkpoints = metodosPuntosControl.getPuntosControl()
            res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de los checkpoints'})
            res.write(checkpoints)
            return res.end()
        }else if(parametros.length == 3){
            metodosPuntosControl.getPuntoControl(parametros[2],res)
        }
    }else if(req.method === 'POST'){ 
        try{
            setHeaders(res);
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                if(!parsedBody.id || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                    res.writeHead(400, {'message':'No se pudo agregar al punto de control debido a la falta de datos'})
                    res.end()
                    return;
                }else{
                    metodosPuntosControl.postPuntoControl(parsedBody,res)
                    res.writeHead(200,{'message':'Se agrego el punto de control'})
                    return res.end()
                }
            })
        }catch (e){
            console.log('Error', e)
            res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
            return res.end()
        }
    }else if(req.method === 'DELETE'){
        setHeaders(res);
        if(parametros.length == 2){
            metodosPuntosControl.deletePuntosControl(req,res)
            res.writeHead(200,{'message':'Se eliminaron los punto de control'})
        }else if(parametros.length == 3){
            metodosPuntosControl.deletePuntoControl(parametros[2],res)
            res.writeHead(200,{'message':'Se elimino el punto de control'})
        }
        return res.end()
    }else if(req.method === 'PATCH'){
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
                    metodosPuntosControl.patchPuntosControl(newCheckpoint,res)
                    res.writeHead(200,{'message':'El punto de control ha sido modificado'})
                    return res.end()
                }
            })
            
        }
        catch (e) {
            console.log('Error', e)
            res.writeHead(500,  {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
            return res.end()
            }
    
    }  
    else{ //Caso se confundio de calle
        res.writeHead(404, {'message':'Ruta no encontrada'})
        return res.end() 
    }
}
    

