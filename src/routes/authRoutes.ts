import express from 'express';
import { login } from '../controllers/authController';
import { validateLoginInput } from '../middlewares/authValidation';

const router = express.Router();

router.post('/login', validateLoginInput, login);


export default router;
