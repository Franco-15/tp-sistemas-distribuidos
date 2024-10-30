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

/* Dudas/pensamientos/cosas para hacer:
    - Viendo un tp viejo(Angus) usan mucho setHeader al principio de los createServer, investigar porque xd
    - Habria que hacer verificaciones de las solicitudes para asegurarse de que lleguen de algun punto de control
*/

let parametros

const server = http.createServer((req, res) => {
    if(req.url.startsWith(rutaAnimal)){
        parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            console.log(parametros.length)
            if(parametros.length == 1){
                //Metodo para obtener todas las vacas
                const allAnimals = metodosAnimales.getAnimales(req,res)
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
                            const checkpointsJson = metodosPuntosControl.getJson()
                            const externalId = parsedBody.checkpointID
                            const exists = checkpoints.some(checkpoint => checkpoint.id === externalId);
                            if (exists) {    
                                const allAnimals= metodosAnimales.getAnimales(req,res)
                                //directamente dejo los animales que tengo registrados
                                const filteredAnimals = checkpoint.animals.filter(animal => allAnimals.hasOwnProperty(animal.id));
                                //Aca se mandarian los animales al front
                                
                            } 
                            else {
                                res.writeHead(500, "Id desconocido")
                                res.end()
                            }
                            
                            res.end()
                        })
                    } catch (e) {
                    res.writeHead(500, "Error")
                    res.end()
                }
                   
                }else{
                    //Metodo para obtener una vaca especifica
                    const animalBuscado = metodosAnimales.getAnimal(parametros[1],res)
                }
            }
            //HAY QUE VER COMO SE ENVIA LA RESPUESTA AL FRONT

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
                    console.log(parsedBody.id)
                    metodosAnimales.postAnimal(parsedBody,res)
                })

            }catch (e){
                console.log('Error', e)
                res.writeHead(500, "Error")
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
        }else if(req.method === 'PATCH'){
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                    const newAnimal = {
                        id: parametros[1],
                        name: parsedBody.name,
                        description: parsedBody.description
                    }
                    metodosAnimales.patchAnimal(newAnimal,res)
                    res.end()
                })
            } catch (e) {
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            res.end() 
        }
    } else if (req.url.startsWith(rutaPtoDeCtrl)){
        parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            if(parametros.length == 2){
                const checkpoints = metodosPuntosControl.getPuntosControl(req,res)
            }else if(parametros.length == 3){
                const checkpoint = metodosPuntosControl.getPuntoControl(parametros[2],res)
            }
            //HAY QUE VER COMO SE ENVIA LA RESPUESTA AL FRONT
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

                    metodosPuntosControl.postPuntoControl(parsedBody,res)
                })
            }catch (e){
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else if(req.method === 'DELETE'){
            if(parametros.length == 2){
                metodosPuntosControl.deletePuntosControl(req,res)
            }else if(parametros.length == 3){
                metodosPuntosControl.deletePuntoControl(parametros[2],res)
            }
        }else if(req.method === 'PATCH'){
            try {
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
                    const newCheckpoint = {
                        id: parametros[1],
                        lat: parsedBody.lat,
                        long: parsedBody.long,
                        description: parsedBody.description
                    }
                    metodosPuntosControl.patchCheckpoint(newCheckpoint,res)
                    res.end()
                })
            } catch (e) {
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            res.end() 
        }
    }else if(req.url.startsWith(rutaLogin)){
        //ACA HABRIA QUE DESARROLLAR EL TEMA DEL LOGIN

    }else if(req.url.startsWith(rutaRefresh)){
        //ACA HABRIA QUE DESARROLLAR EL TEMA DEL REFRESH
    }else { //Caso se confundio de calle
        res.writeHead(404, 'Ruta no encontrada');
        res.end() 
    }
})

server.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`)
})