import express from 'express';
import * as productController from '../controllers/productController.ts';
import { validateProduct, validateProductUpdate, handleProductValidation, verifyProduct } from '../middlewares/productValidation.ts';
import * as auth from '../middlewares/authValidation.ts';
import { upload } from "../config/multerConfig.ts";



const router = express.Router();

router.post('/create/', auth.verifyToken, validateProduct,upload.single("photo"), handleProductValidation, productController.createProduct);
router.patch('/update/:id', auth.verifyToken, verifyProduct, validateProductUpdate, handleProductValidation, productController.updateProduct);
router.get('/details/:id', auth.verifyToken, verifyProduct, productController.getProductById);
router.delete('/delete/:id', auth.verifyToken, verifyProduct, productController.deleteProduct);
router.get('/inStock/:id', productController.inStock);
router.get('/all/', productController.getProducts);

export default router;
