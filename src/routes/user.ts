import express from 'express';
import { getUserById } from '../controllers/userController.ts';
import * as userController from '../controllers/userController.ts';
import {
  validateUserInput,
  validateUserPatchInput,
} from "../middlewares/userValidation.ts";


const router = express.Router();

router.post('/register', validateUserInput, userController.createUser);
router.patch('/update/:id', validateUserPatchInput, userController.patchUser);


export default router;
