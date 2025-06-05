import express from 'express';
import * as productController from '../controllers/productController.ts';
import { handleProductValidation } from '../middlewares/productValidation.ts';




const router = express.Router();

router.post('/create/', handleProductValidation, productController.createProduct);

export default router;
