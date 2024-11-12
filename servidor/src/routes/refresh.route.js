import express from 'express';
import { refreshUser } from '../controllers/admins.controller.js';

//Clase en la que se manejan todas las rutas finales asociadas a refrescar el token de acceso

const router = express.Router();

// Ruta para llevar a cabo el refresh del token
router.post('/', (req, res) => { 
    refreshUser(req, res);
});

export default router;