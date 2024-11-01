import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as metodosAnimales from './controllers/metodosAnimales.js'
import * as metodosPuntosControl from './controllers/metodosPuntosControl.js'
import { parse } from 'path';

const HTTP_PORT = 3000;  //Esto es placebo supongo (no se xd)
const rutaAnimal = "/animals"
const rutaPtoDeCtrl = "/checkpoints"
const rutaLogin = "/login"
const rutaRefresh = "/refresh"


let parametros
const animals = metodosAnimales.getAnimales()
const checkpoints = metodosPuntosControl.getPuntosControl()

const server = http.createServer((req, res) => {
    if(req.url.startsWith(rutaAnimal)){
        parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            console.log(parametros.length)
            if(parametros.length == 1){
                //Metodo para obtener todas las vacas
                try{
                    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de animales'})
                    res.write(Animals)
                }catch(e){
                    res.writeHead(500,{'message':'Falcaont'})  
                    res.end()
                }
            }else if(parametros.length == 2){
                if(parametros[1] == "position"){
                    try {
                        //Metodo para rescatar posiciones de todos los animales
                        let body = '';
                        req.on('data', (chunk) => {
                            body = body + chunk;
                        });
                        req.on('end', () => {
                            const parsedBody = JSON.parse(body);
                            //Habria que verificar que el UUID del arduino concuerde con alguno del checkpoints.json
                            const checkpointsss = metodosPuntosControl.getJson()
                            //console.log(checkpointsss)
                            const externalId = parsedBody.checkpointId
                            //console.log(externalId)
                            const exists = checkpointsss.some(checkpoint => checkpoint.id === externalId);
                            if (exists) {    
                                //directamente dejo los animales que tengo registrados
                                const recAnimals = parsedBody.animals
                                const filteredAnimals = recAnimals.filter(animal => animals.hasOwnProperty(animal.id));

                                //*FALTARIA VER COMO BRINDAR EL RESTO DE INFORMACION DE LOS ANIMALES
                                //console.log(filteredAnimals)

                                res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Animales localizados'})
                                res.write(JSON.stringify(filteredAnimals))
                            } 
                            else {
                                res.writeHead(500,{'message':'ID desconocido'})
                            }
                            res.end()
                        })
                    } catch (e) {
                    res.writeHead(500,{'message':'Error inesperado'})  //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                    res.end()
                }
                   
                }else{
                    //Metodo para obtener una vaca especifica
                    const animalBuscado = metodosAnimales.getAnimal(parametros[1],res)
                    res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Animal localizado'})
                    res.write(JSON.stringify(filteredAnimals))
                }
            }
        }else if(req.method === 'POST'){ 
            try{
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parsedBody.id || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'No se pudo agregar al animal debido a la falta de datos'})
                        res.end()
                        return;
                    }else{
                        console.log(parsedBody.id)
                        metodosAnimales.postAnimal(parsedBody,res)
                        res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Vaca-yendo gente al baile'})
                        res.end()
                    }
                })

            }catch (e){
                console.log('Error', e)
                res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                res.end()
            }
        }else if(req.method === 'DELETE'){
            if(parametros.length == 1){
                //Metodo para eliminar todos los animales
                metodosAnimales.deleteAnimales(req,res)
            }else if(parametros.length == 2){
                //Metodo para eliminar un animal especifico
                metodosAnimales.deleteAnimal(parametros[1],res)
            }
            res.writeHead(200,{'message':'Eliminación Realizada'})
            res.end()
        }else if(req.method === 'PATCH'){
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parametros[1] || !parsedBody.name || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'No se pudo modificar al animal debido a la falta de datos'})
                        res.end()
                        return;
                    }else{
                        const newAnimal = {
                            id: parametros[1],
                            name: parsedBody.name,
                            description: parsedBody.description
                        }
                        metodosAnimales.patchAnimal(newAnimal,res)
                        res.writeHead(200,{'message':'Se modifico correctamente al animal'})
                        res.end()
                    }
                })
            } catch (e) {
                console.log('Error', e)
                res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404,  {'message':'Ruta no encontrada'});
            res.end() 
        }
    } else if (req.url.startsWith(rutaPtoDeCtrl)){
        parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            if(parametros.length == 1){
                res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el listado de los checkpoints'})
                res.write(checkpoints)
            }else if(parametros.length == 2){
                const checkpoint = metodosPuntosControl.getPuntoControl(parametros[1],res)
                res.writeHead(200,{'Content-Type': 'application/json', 'message': 'Se encontro el checkpoint'})
                res.write(checkpoint)
            }
            res.end()
        }else if(req.method === 'POST'){ 
            try{
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
                        res.end()
                    }
                })
            }catch (e){
                console.log('Error', e)
                res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                res.end()
            }
        }else if(req.method === 'DELETE'){
            if(parametros.length == 1){
                metodosPuntosControl.deletePuntosControl(req,res)
                res.writeHead(200,{'message':'Se eliminaron los punto de control'})
            }else if(parametros.length == 2){
                metodosPuntosControl.deletePuntoControl(parametros[1],res)
                res.writeHead(200,{'message':'Se elimino el punto de control'})
            }
            res.end()
        }else if(req.method === 'PATCH'){
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    if(!parametros[1] || !parsedBody.lat || !parsedBody.long || !parsedBody.description){ //Entra por aca si falta algun dato
                        res.writeHead(400, {'message':'No se pudo modificar el punto de control debido a la falta de datos'})
                        res.end()
                        return;
                    }else{
                        const newCheckpoint = {
                            id: parametros[1],
                            lat: parsedBody.lat,
                            long: parsedBody.long,
                            description: parsedBody.description
                        }
                        metodosPuntosControl.patchCheckpoint(newCheckpoint,res)
                        res.writeHead({'message':'El punto de control ha sido modificado'})
                        res.end()
                    }
                })
            } catch (e) {
                console.log('Error', e)
                res.writeHead(500,  {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
                res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404, {'message':'Ruta no encontrada'})
            res.end() 
        }
    }else if(req.url.startsWith(rutaLogin)){
        //ACA HABRIA QUE DESARROLLAR EL TEMA DEL LOGIN
        try{
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                if(!parsedBody.username || !parsedBody.password){
                    res.writeHead(400, {'message':'No se pudo verificar al usuario debido a la ausencia de datos'})
                    res.end()
                    return;
                }else{
                    const passwordCodif = "" //?Habria que realizar la codificación de la contraseña para compararla con la del txt
                    //*Habria que agarrar la info del json y compararla con la del parsedBody
                    res.writeHead(200,{'message':'Usuario logueado'})
                    res.end()
                }
            })
        }catch (e){
            console.log('Error', e)
            res.writeHead(500, {'message':'Error inesperado'}) //? CHUSMEAR PORQUE SE LLEGARÍA A ESTA LINEA DE CODIGO
            res.end()
        }
    }else if(req.url.startsWith(rutaRefresh)){
        //ACA HABRIA QUE DESARROLLAR EL TEMA DEL REFRESH
    }else { //Caso se confundio de calle
        res.writeHead(404, {'message':'Ruta no encontrada'})
        res.end() 
    }
})

server.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`)
})