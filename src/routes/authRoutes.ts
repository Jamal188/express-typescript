import express from 'express';
import { login } from '../controllers/authController.ts';
import { validateLoginInput } from '../middlewares/authValidation.ts';

const router = express.Router();

router.post('/login', validateLoginInput, login);


export default router;
