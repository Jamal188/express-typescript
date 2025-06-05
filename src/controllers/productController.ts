import { Request, Response } from 'express';
import * as productService from '../services/productService.ts';
import { IProduct, IProductPatch } from '../models/Product.ts';



export const createProduct = async (req: Request, res: Response) => {
    try {
	if (!req.validatedProductData) {
	    throw new Error("Create data is required");
	}
	if(!req.userId) {
	    throw new Error("Login required");
	}
	const product = await productService.createProduct(req.validatedProductData, req.userId);
	res.status(201).json(product);
    } catch (error) {
	    if (error instanceof Error) {
		res.status(500).json({error: error.message});
            }
	    else {
		res.status(500).json({error: "db error!"});
	    }
   }
};

