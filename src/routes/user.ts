import express from 'express';
import { getUserById } from '../controllers/userController';
import * as userController from '../controllers/userController';
import {
  validateUserInput,
  validateUserPatchInput,
} from "../middlewares/userValidation";


const router = express.Router();

router.post('/register', validateUserInput, userController.createUser);
router.patch('/update/:id', validateUserPatchInput, userController.patchUser);


export default router;
