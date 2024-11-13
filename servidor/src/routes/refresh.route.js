import express from 'express';
import { refreshUser } from '../controllers/admins.controller.js';

//Clase en la que se manejan todas las rutas finales asociadas a refrescar el token de acceso

const router = express.Router();

// POST /api/refresh - Refresca el token de acceso del usuario del sistema
router.post('/', (req, res) => { 
    refreshUser(req, res);
});

export default router;