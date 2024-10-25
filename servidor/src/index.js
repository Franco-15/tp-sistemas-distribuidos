import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as metodosAnimales from './controllers/metodosAnimales.js'
import * as metodosPuntosControl from './controllers/metodosPuntosControl.js'

const HTTP_PORT = 3000;  //Esto es placebo supongo (no se xd)
const rutaAnimal = "/Animal/"
const rutaPtoDeCtrl = "/PuntoControl"

/* Dudas/pensamientos/cosas para hacer:
    - Habria que crear metodos para gestionar el tema de los GET y DELETE(Revisar codigos viejos de Martin)
        Esto se podría hacer en la misma clase o en otras clases (Siento que esto ultimo es más la vibe de martin)
    - Viendo un tp viejo(Angus) usan mucho setHeader al principio de los createServer, investigar porque xd
    - Habria que hacer verificaciones de las solicitudes para asegurarse de que lleguen de algun punto de control
*/

let parametros

const server = http.createServer((req, res) => {
    if(req.url.startsWith(rutaAnimal)){
        parametros = req.url.split("/")
        parametros = parametros.filter(el => el != '')   //filtro los vacios
        if(req.method === 'GET'){
            if(parametros.length == 2){
                //Metodo para obtener todas las vacas
                metodosAnimales.getAnimales(req,res)
            }else if(parametros.length == 3){
                //Metodo para obtener una vaca especifica
                const animalBuscado = metodosAnimales.getAnimal(parametros[2],res)
                
                //ENVIARLA AL FRONT SUPONGO?

                res.end()
            }
        }else if(req.method === 'POST'){ /*Tomar en consideración que estos datos se supone que se filtran del listado de animales conectados al punto de control.
                                            Por el momento, asumo que las actualizaciones del PdC entraran por aca*/
            try{
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)

                    metodosAnimales.postAnimal(parsedBody,res)
                })

            }catch (e){
                console.log('Error', e)
                res.writeHead(500, "Error")
                res.end()
            }
        }else if(req.method === 'DELETE'){
            if(parametros.length == 2){
                //Metodo para eliminar todos los animales
                metodosAnimales.deleteAnimales(req,res)
            }else if(parametros.length == 3){
                //Metodo para eliminar un animal especifico
                metodosAnimales.deleteAnimal(parametros[2],res)
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
                metodosPuntosControl.getPuntosControl(req,res)
            }else if(parametros.length == 3){
                metodosPuntosControl.getPuntoControl(parametros[2],res)

                //ENVIARLO AL FRONT SUPONGO IDK

                res.end()
            }
        }else if(req.method === 'POST'){
            try{
                let body = '';
                req.on('data', (chunk) => {
                    body = body + chunk;
                });
                req.on('end', () => {
                    const parsedBody = JSON.parse(body);
                    //Habria que aplicar un chequeo de datos(no lo hice porque ni idea que nombres tendran las variables)
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
        }else{ //Caso se confundio de calle
            res.writeHead(404, 'Ruta no encontrada');
            res.end() 
        }
    }else{ //Caso se confundio de calle
        res.writeHead(404, 'Ruta no encontrada');
        res.end() 
    }
})

server.listen(HTTP_PORT, () => {
    console.log(`Servidor escuchando en puerto ${HTTP_PORT}`)
})