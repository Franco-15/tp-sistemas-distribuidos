import express from 'express';
import { validUser } from '../controllers/admins.controller.js';

const router = express.Router();

// Ruta para el login, manejada por validUser
router.post('/login', (req, res) => { //todo: chequear 
    validUser(req, res);
});

export default router;


/*import { validUser } from '../controllers/admins.controller.js';

export const loginRoute = (req, res) => {
    validUser(req,res)
}

*/