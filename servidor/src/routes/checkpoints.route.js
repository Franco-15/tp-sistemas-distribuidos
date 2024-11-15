import express from 'express';
import * as checkpointMethods from '../controllers/checkpoints.controller.js';

//Clase en la que se manejan todas las rutas finales asociadas a checkpoints

const router = express.Router();
let checkpoints;
let id;

// GET /api/checkpoints - Obtener todos los checkpoints
router.get('/', (req, res) => {
    try {
        checkpoints = checkpointMethods.getPuntosControl();
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.write(checkpoints);
        return res.end();
    } catch (error) {
        res.writeHead(500, 'Error al obtener el listado de checkpoints');
        return res.end();
    }
});

// GET /api/checkpoints/:id - Obtener un checkpoint especifico
router.get('/:id', (req, res) => {
    id = req.url.split("/")
    checkpointMethods.getPuntoControl(id[1], res);
});

// POST /api/checkpoints - Agregar un checkpoint
router.post('/', (req, res) => {
    const { id, lat, long, description } = req.body;

    if (!id || !lat || !long || !description) {
        res.writeHead(400, 'No se pudo agregar el checkpoint debido a la falta de datos' );
        return res.end();
    }

    try {
        if (checkpointMethods.postPuntoControl(req.body)) {
            res.writeHead(200, 'Checkpoint agregado exitosamente' );
        } else {
            res.writeHead(400, 'El checkpoint con este ID ya existe');
        }
        return res.end();
    } catch (error) {
        res.writeHead(500, 'Error del servidor, no se pudo agregar el checkpoint');
        return res.end();
    }
});

// DELETE /api/checkpoints/:id - Eliminar un checkpoint especifico
router.delete('/:id', (req, res) => {
    try {
        id = req.url.split("/")
        if (checkpointMethods.deletePuntoControl(id[1])) {
            res.writeHead(200, 'Checkpoint eliminado exitosamente');
        } else {
            res.writeHead(404, 'El checkpoint buscado no existe o no se encuentra registrado en el sistema');
        }
        return res.end();
    } catch (error) {
        res.writeHead(500, 'Error al eliminar el checkpoint');
        return res.end();
    }
});

// PATCH /api/checkpoints/:id - Modificar un checkpoint
router.patch('/:id', (req, res) => {
    id = req.url.split("/")
    const { lat, long, description } = req.body;

    if (!lat || !long || !description) {
        res.writeHead(400, 'No se pudo modificar el checkpoint debido a la falta de datos');
        return res.end();
    }

    try {
        const newCheckpoint = { id: id[1], lat: lat, long: long, description: description };
        if (checkpointMethods.patchPuntosControl(newCheckpoint)) {
            res.writeHead(200, 'Checkpoint modificado exitosamente');
        } else {
            res.writeHead(404, 'El checkpoint buscado no existe o no se encuentra registrado en el sistema');
        }
        return res.end();
    } catch (error) {
        res.writeHead(500, 'Error al modificar el checkpoint');
        return res.end();
    }
});

export default router;


