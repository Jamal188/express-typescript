import express from 'express';
import * as productController from '../controllers/productController.ts';
import { handleProductValidation, verifyProduct } from '../middlewares/productValidation.ts';
import * as auth from '../middlewares/authValidation.ts';



const router = express.Router();

router.post('/create/', auth.verifyToken, handleProductValidation, productController.createProduct);
router.patch('/update/', auth.verifyToken, verifyProduct, handleProductValidation, productController.updateProduct);
router.get('/details/:id', auth.verifyToken, verifyProduct, productController.getProductById);
router.get('/inStock/', productController.inStock);

export default router;
