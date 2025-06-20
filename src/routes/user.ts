import express from 'express';
import * as userController from '../controllers/userController.ts';
import {
  validateUserInput,
  validateUserPatchInput,
} from "../middlewares/userValidation.ts";
import { verifyToken  } from '../middlewares/authValidation.ts';

const router = express.Router();

router.post('/register', validateUserInput, userController.createUser);
router.patch('/update/:id', validateUserPatchInput, userController.patchUser);
router.delete('/delete/:id', verifyToken, userController.deleteUser);

export default router;
