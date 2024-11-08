import { validUser } from '../controllers/admins.controller.js';

export const loginRoute = (req, res) => {
    validUser(req,res)
}