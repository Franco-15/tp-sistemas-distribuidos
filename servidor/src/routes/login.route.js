import express from 'express';
import { validUser } from '../controllers/admins.controller.js';

//Clase en la que se manejan todas las rutas finales asociadas al logueo de usuarios en el sistema

const router = express.Router();

// Ruta para el login
router.post('/', (req, res) => { 
    validUser(req, res);
});

export default router;


